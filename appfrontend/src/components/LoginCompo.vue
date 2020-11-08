<template>

 <v-container fluid class="background" > 
      
      <div>

        <v-app-bar
          color="black"
          dense
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>{{titulo}}</v-toolbar-title>

          <v-spacer></v-spacer> <!-- https://github.com/marcep00/SIBI_Proyecto -->

          <v-btn href="https://github.com/marcep00/SIBI_Proyecto" target="_blank">
            Mi github
            <v-icon>mdi-github</v-icon>
          </v-btn>

        </v-app-bar>
        <br><br><br v-if="!registrar"><br v-if="!registrar"><br v-if="!registrar"><br v-if="!registrar">
        <!-- Area de login/registro -->
        <v-row fluid>
          
          <v-card
            class="mx-auto"
            width="700"
          >
            <v-card-text>
              <!-- Registro -->
              <div v-if="registrar">
                
                <p class="display-1 text--primary">
                Registrate ahora
                </p>

                <v-text-field
                    label="Nombre y apellidos"
                    v-model="nombreapellidos"
                ></v-text-field>
                <br>
                <v-text-field
                    label="Usuario"
                    v-model="usuario"
                ></v-text-field>
                <br>
                <v-text-field
                    label="Año de nacimiento"
                    v-model="anonacimiento"
                ></v-text-field>
                <br>
                <v-text-field type="password"
                    label="Contraseña"
                    v-model="contrasena"
                ></v-text-field>

              </div>

            <!-- Login -->
              <div v-if="!registrar">
                
                <p class="display-1 text--primary">
                Inicia sesión
                </p>

                <v-text-field
                    label="Usuario"
                    v-model="usuario"
                ></v-text-field>
                <br>
                <v-text-field type="password"
                    label="Contraseña"
                    v-model="contrasena"
                ></v-text-field>

              </div>

              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ma-2"
                  outlined
                  rounded
                  color="light-blue accent-2"
                  v-if="registrar"
                  @click="registro()"
                >
                  Registrarse
                </v-btn>

                <v-btn
                  class="ma-2"
                  outlined
                  rounded
                  color="light-blue accent-2"
                  v-if="!registrar"
                  @click="iniciar_sesion()"
                >
                  Iniciar sesión
                </v-btn>

                <p v-if="!registrar"> <br>/ <a @click="registrar = !registrar">registrate</a></p>

              </v-card-actions>
              
              <p v-if="registrar">- Si ya tienes una cuenta <a @click="registrar = !registrar">inicia sesión</a></p>
          </v-card>
        </v-row>
        <br><br><br><br><br><br v-if="!registrar"><br v-if="!registrar"><br v-if="!registrar"><br v-if="!registrar">
      </div>

  </v-container>
</template>

<script>

const axios = require('axios');

export default {
   name: 'home',
 data: () => ({
   titulo: 'Regístrate o inicia sesión para comenzar',
   registrar: true,
   nombreapellidos: '',
   usuario: '',
   anonacimiento: '',
   contrasena: '',
 }),

 methods: {
   registro: function () {
     
     if( (this.nombreapellidos.length == '0') || (this.usuario.length == '0') || (this.anonacimiento.length == '0') || (this.contrasena.length == '0')){
       alert('Debes de rellenar todos los campos')
     }else{

       // Make a request for a user with a given ID
      axios
      .post('http://localhost:3000/registro', {
          usuario: this.usuario,
          nombre: this.nombreapellidos,
          contrasena: this.contrasena,
          anonacimiento: this.anonacimiento
        })
        .then((response) => {
          // handle success
          var json = {msg: 'Error'};

          if(JSON.stringify(response.data)==JSON.stringify(json)){
            alert('El nombre de usuario ya está uso')
            this.limpiarFormulario()
          }else{
            this.$router.push({ name: 'Home', params: { usuario: this.usuario } })
            this.limpiarFormulario()
          }
          
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        })

     }
   },

   iniciar_sesion: function () {

     if((this.usuario.length == '0') || (this.contrasena.length == '0')){

      alert('Debes de rellenar todos los campos');

     }else{

      // Make a request for a user with a given ID
      axios
      .post('http://localhost:3000/login', {
          usuario: this.usuario,
          password: this.contrasena
        })
        .then((response) => {
          // handle success
          var json = {msg: 'Error'};

          if(JSON.stringify(response.data)==JSON.stringify(json)){
            alert('Usuario no encontrado')
            this.limpiarFormulario()
          }else{
            this.$router.push({ name: 'Home', params: { usuario: this.usuario } })
            this.limpiarFormulario()
          }
          
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        })

     }
   },

   limpiarFormulario: function () {
      this.nombreapellidos = '';
      this.anonacimiento = '';
      this.contrasena = '';
      this.usuario = '';
   }
 } 
}
</script>

<style>
  .background { 
    background-size: cover;
    /* Ubicación de la imagen */
    background-image: url("../assets/Faedo.png");
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
