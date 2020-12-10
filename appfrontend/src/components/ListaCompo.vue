<template>

 <v-container fluid class="principalLista" > 
  <v-app-bar
          color="black"
          dense
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>{{titulo}}</v-toolbar-title>

          <v-avatar
            size="70"
            class="mr-4"
          >
            <v-img
              src="../assets/logo.png"
              contain
            ></v-img>
          </v-avatar>

          <v-spacer></v-spacer>

          <v-btn @click="atras()">
            <v-icon>mdi-arrow-left-circle</v-icon>
            Atrás
          </v-btn>

        </v-app-bar>

        <v-btn 
          block 
          color="white" 
          v-show="mostrarBotonG" 
          @click="show = !show">
            <a v-if="!show">
            Mostrar descripción de las rutas
            </a>
            <a v-if="show">
            Ocultar descripción de las rutas
            </a>
          </v-btn>

        <v-row>
              <v-col 
              v-for="item in rutas"
              :key="item.nombre_ruta"
              cols="6">
              <v-hover
                v-slot:default="{ hover }"
                open-delay="200"
              >
                  <v-card
                      :elevation="hover ? 16 : 2"
                      class="mx-auto"
                      max-width="500"
                  >
                      <v-img
                      class="white--text align-end"
                      height="300px"
                      :src=(item.imagen)
                      :aspect-ratio="16/9"
                      contain
                      >
                      </v-img>
                      <v-card-title class="pb-1">{{item.nombre_ruta}}</v-card-title>

                    <v-expand-transition>
                          <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                              Punto de salida: {{item.punto_salida}}
                              <br>
                              Distancia: {{item.distancia}} km
                              <br>
                              Tiempo: {{item.tiempo}} h
                              <br>
                              Desnivel: {{item.desnivel}} metros aprox.
                              <br>
                              Circular: {{item.circular}}
                              <br>
                              Época recomendada: {{item.epoca}}
                              <br>
                              Dificultad: {{item.dificultad}}
                              <br>
                              Tipo: {{item.tipo}}
                            </v-card-text>
                          </div>
                        </v-expand-transition>

                  </v-card>
                </v-hover>
              </v-col>
          </v-row>

</v-container>
</template>

<script>

const axios = require('axios');

export default {
name: 'home',
props: {
  usuario: String
},
data: () => ({
    titulo: 'Tus rutas favoritas',
    rutas: [],
    show: false,
    mostrarBotonG: false,
}),
mounted: function () {
    // Make a request
    axios
    .post('http://localhost:3000/listarutas', {
        usuario: this.usuario
    })
    .then((response) => {
        // handle success
          var json = {msg: 'Error'};

          if(JSON.stringify(response.data)==JSON.stringify(json)){
            alert('No hay rutas que mostrar para este usuario')
          }else{

              this.rutas = response.data

            this.mostrarBotonG = true;
          }
    })
    .catch((error) => {
        // handle error
        console.log(error);
    });
},
methods: {
    atras: function(){
        this.$router.push({ name: 'Home', params: { usuario: this.usuario } })
    }
}

}
</script>

<style>
  .principalLista { 
    background-size: cover;
    /* Ubicación de la imagen */
    background-image: url("../assets/FondoMontana2.jpg");
    /* Para dejar la imagen de fondo centrada, vertical y
    horizontalmente */
    background-position: center center;
    /* Para que la imagen de fondo no se repita */
    background-repeat: no-repeat;
    /* La imagen se fija en la ventana de visualización para que la altura de la imagen no supere a la del contenido */
    background-attachment: fixed;
    /* La imagen de fondo se reescala automáticamente con el cambio del ancho de ventana del navegador */
    background-size: cover;
    /* Se muestra un color de fondo mientras se está cargando la imagen
    de fondo o si hay problemas para cargarla */
    background-color: #252525;
  }
  
</style>
