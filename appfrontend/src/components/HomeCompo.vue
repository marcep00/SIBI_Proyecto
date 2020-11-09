<template>

 <v-container fluid class="principal" > 
      
      <div>

        <v-app-bar
          color="black"
          dense
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>{{titulo}}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn @click="cambiarALista()">
            Tus rutas
            <v-icon>mdi-list-status</v-icon>
          </v-btn>
         
          <v-btn @click="$router.push('/')">
            Salir
            <v-icon>mdi-login-variant</v-icon>
          </v-btn>

        </v-app-bar>
        
        <!-- <div>
            <v-carousel
            cycle
            height="500"
            hide-delimiter-background
            show-arrows-on-hover
            >
            <v-carousel-item
              v-for="(imagen,i) in imagenes"
              :key="i"
              :src="imagen.src"
            ></v-carousel-item>
          </v-carousel>
        </div>
      -->

      <h2>Comencemos:</h2>

      <!-- Area de seleccion de la ruta -->
      <v-row fluid>
         <v-col cols="4">
          <div fluid>
          <v-row>
            <h3>--¿Qué dificultad estás dispuesto a afrontar?:</h3>
            
            <v-col cols="6">
              <v-select
                :items="dificultades"
                v-model="dificultad"
                label="Dificultad"
                outlined
              ></v-select>
            </v-col>
          </v-row>
           <v-row>
            <h3>--¿En qué época estás pensando para hacerla?:</h3>
            
            <v-col cols="6">
              <v-select
                :items="epocas"
                v-model="epoca"
                label="Época"
                outlined
              ></v-select>
            </v-col>
          </v-row>
           <v-row>
            <h3>--¿Cómo te gustaría recorrer el trayecto?:</h3>
            
            <v-col cols="6">
              <v-select
                :items="tipos"
                v-model="tipo"
                label="Tipo de ruta"
                outlined
              ></v-select>
            </v-col>
          </v-row>
           <v-row>
            <h3>--O bien, si lo tienes claro, puedes buscarla directamente:</h3>
            <v-col cols="6">
              <v-text-field
                  v-model="rutaBuscarNombre"
                  label="Nombre de la ruta"
                  outlined
                  clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <br>
          <v-row align="center" justify="space-around">
            <v-btn
              rounded
              color="black"
              block
              @click="buscar()"
            >
              <v-icon left color="blue">
                mdi-routes
              </v-icon>
              <a color="blue">¡Vamos allá!</a>
            </v-btn>
          </v-row>
          </div>
          
        </v-col>
        
        <!-- Aqui los resultados -->
        <v-col cols="8">
          <!-- Boton mostrar resultados -->
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
                      <v-card-title class="pb-1">
                        {{item.nombre_ruta}}
                        <p style="color:green;">
                          {{item.recomendada}}
                        </p>
                      </v-card-title>

                      <v-card-actions>
                          <v-btn 
                          class="ma-2" 
                          color="blue" 
                          dark
                          rounded
                          @click="crear_Relacion_Buena(item.nombre_ruta)"
                          >
                          Me ha gustado
                              <v-icon dark right>mdi-thumb-up</v-icon>
                          </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn 
                          class="ma-2" 
                          color="red"
                          dark
                          rounded
                          @click="crear_Relacion_Mala(item.nombre_ruta)"
                          >
                          No es para mi
                              <v-icon dark right>mdi-thumb-down</v-icon>
                          </v-btn>

                          </v-card-actions>

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
        </v-col>
      </v-row>
           
      <v-dialog
      v-model="dialog"
      max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Información
          </v-card-title>

          <v-card-text>
            Se ha guardado su opinion
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="blue"
              text
              @click="dialog = false"
            >
              Aceptar
            </v-btn>
          
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
      v-model="dialog_2"
      max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Información
          </v-card-title>

          <v-card-text>
            Se ha guardado su opinion
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="red"
              text
              @click="dialog_2 = false"
            >
              Aceptar
            </v-btn>
          
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>

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
  rutas: [],
  rutas_fav: [], //rutas favoritas del usuario
  rutas_recom_plana: [], //rutas recomendadas al buscar de forma plana
  usuarios_relacionados: [],
  usuarios_rel_def: [],
  ruta: 
  {
    nombre_ruta: '',
    distancia: '',
    tiempo: '',
    punto_salida: '',
    desnivel: '',
    circular: '',
    epoca: '',
    dificultad: '',
    tipo: '',
    imagen: ''
  },
  rutaBuscarNombre: '',
  show: false,
  mostrarBotonG: false,
  titulo: 'Encuentra tu próxima aventura',
  dificultades: ['Aleatorio', 'Baja', 'Media', 'Alta'],
  dificultad: 'Aleatorio',
  epocas: ['Cualquiera', 'Primavera', 'Verano', 'Otoño', 'Todo el año', 'Todo el año. Evitar nevadas'],
  epoca: 'Cualquiera',
  tipos: ['Cualquiera', 'Andando', 'Bici', 'Andando o en bici'],
  tipo: 'Cualquiera',
  dialog: false,
  dialog_2: false,
  imagenes: [
          {
            src: 'https://images3.alphacoders.com/798/798014.jpg',
          },
          {
            src: 'https://images8.alphacoders.com/866/866198.jpg',
          },
          {
            src: 'https://2.bp.blogspot.com/-31p400ZmNE0/U_y7Wv3h7VI/AAAAAAAAA7s/ubZLUU0yOLI/s1600/DSC02960.JPG',
          },
          {
            src: 'https://fondosmil.com/fondo/24255.jpg',
          },
],

 }),

 methods: {
   buscar_por_nombre: function() {
     // Make a request for a user with a given ID
      axios
      .post('http://localhost:3000/buscarnombre', {
          nombre: this.rutaBuscarNombre
        })
        .then((response) => {
          // handle success
          var json = {msg: 'Error'};

          if(JSON.stringify(response.data)==JSON.stringify(json)){
            alert('No se ha encontrado ninguna ruta con ese nombre')
          }else{
            
            for(var i=0;i<response.data.length;i++){

              this.rutas = response.data

            }
            this.mostrarBotonG = true;
          }
          
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
      })
   },

  crear_Relacion_Buena: function(nombre_ruta){
    // Make a request for a user with a given ID
      axios
      .post('http://localhost:3000/relacionbuena', {
          usuario: this.usuario,
          ruta: nombre_ruta
        })
        .then((response) => {
          // handle success
          var json = {msg: 'Error'};

          if(JSON.stringify(response.data)==JSON.stringify(json)){
            alert('Parece que ya has calificado esta ruta antes')
          }else{
            
            this.dialog = true;

          }
          
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
      })
  },
  crear_Relacion_Mala: function(nombre_ruta){

    // Make a request for a user with a given ID
      axios
      .post('http://localhost:3000/relacionmala', {
          usuario: this.usuario,
          ruta: nombre_ruta
        })
        .then((response) => {
          // handle success
          var json = {msg: 'Error'};

          if(JSON.stringify(response.data)==JSON.stringify(json)){
            alert('Parece que ya has calificado esta ruta antes')
          }else{
            
            this.dialog_2 = true;

          }
          
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
      })

  },

  algoritmo_de_recomendaciones: function(){
    console.log(this.usuario)
    if( (this.dificultad != 'Aleatorio') && (this.epoca != 'Cualquiera') && (this.tipo != 'Cualquiera') ){
      
   
      //Guardamos las rutas favoritas del usuario
      this.rellena_rutas_favoritas();
      
      //Se realiza 1ms mas tarde para dar tiempo a que la funcion rellena_rutas_favoritas se ejecute
      setTimeout(() =>{
        if(this.rutas_fav.length >= 3){
          //console.log('dentro')
          //Primero añadimos las rutas por defecto
          this.busqueda_plana()

          //Comienza el algoritmo
          //Almacenamos los usuarios a los que les gustan las mismas rutas que a nosotros
          this.usuarios_rel();
          //console.log(this.usuarios_relacionados)
          setTimeout(()=>{
            //Ahora nos quedamos solo con los usuarios que aparecen 3 o mas veces
            //console.log('depuramos')
            this.usuarios_rel_def = [];//limpiamos por si acaso
            this.depurar_usuarios_relacionados();
            //console.log(this.usuarios_rel_def)
            //Buscamos las rutas de estos usuarios que coinciden con los parámetros de entrada
            //console.log('buscamos rutas recomendadas')
            this.buscar_rutas_recomendadas();
            //console.log(this.rutas)
            
            /*//Si no ha coincidido ninguna, se realiza una busqueda normal
            if(this.rutas.length == 0){
              console.log('0')
              this.busqueda_plana();
            }*/

          }, 100)
        }else{
          console.log('1')
          this.busqueda_plana()
        }
      }, 100);

    }else{//Algun dato de entrada esta en aleatorio, hay que generarlo
      console.log('2')
      this.generando_datos_aleatorios()
      this.busqueda_plana()
    }
    
  },

  generando_datos_aleatorios: function(){

    var numero;

    if(this.dificultad == 'Aleatorio'){

      //Retorna un entero aleatorio entre min (incluido) y max (excluido)
      numero = Math.floor(Math.random() * (4 - 1)) + 1;
      this.dificultad = this.dificultades[numero];

    }

    if(this.epoca == 'Cualquiera'){

      //Retorna un entero aleatorio entre min (incluido) y max (excluido)
      numero = Math.floor(Math.random() * (6 - 1)) + 1;
      this.epoca = this.epocas[numero];

    }

    if(this.tipo == 'Cualquiera'){

      //Retorna un entero aleatorio entre min (incluido) y max (excluido)
      numero = Math.floor(Math.random() * (4 - 1)) + 1;
      this.tipo = this.tipos[numero];

    }


  },

  rellena_rutas_favoritas: function(){
    // Make a request
    axios
    .post('http://localhost:3000/listarutas', {
        usuario: this.usuario
    })
    .then((response) => {
        // handle success
          var json = {msg: 'Error'};

          if(JSON.stringify(response.data)==JSON.stringify(json)){
            console.log('No hay rutas favoritas para este usuario')
          }else{

              this.rutas_fav = response.data;

              console.log(this.rutas_fav)

          }
    })
    .catch((error) => {
        // handle error
        console.log(error);
    });
  },

  usuarios_rel: function(){

    for(var i=0;i<this.rutas_fav.length;i++){
      //console.log('ruta nº'+i+' es: '+this.rutas_fav[i].nombre_ruta)
      // Make a request
      axios
      .post('http://localhost:3000/usuariosrelacionados', {
          ruta: this.rutas_fav[i].nombre_ruta
      })
      .then((response) => {
          // handle success
            var json = {msg: 'Error'};

            if(JSON.stringify(response.data)==JSON.stringify(json)){
              console.log('Ha ocurrido un error')
            }else{
              
              for(var j=0;j<response.data.length;j++){

                this.usuarios_relacionados.push(response.data[j]+'')
                
              }
              
            }
      })
      .catch((error) => {
          // handle error
          console.log(error);
      });

    }
  },

  buscar_rutas_recomendadas: function(){
    console.log('usamos -> '+this.usuarios_rel_def[0])
    for(var i=0;i<this.usuarios_rel_def.length;i++){
      // Make a request
      axios
      .post('http://localhost:3000/rutasrecomendadas', {
          usuario: this.usuarios_rel_def[i],
          dificultad: this.dificultad,
          epoca: this.epoca,
          tipo: this.tipo
      })
      .then((response) => {
          // handle success
            var json = {msg: 'Error'};

            if(JSON.stringify(response.data)==JSON.stringify(json)){
              alert('No hay rutas que mostrar')
            }else{
              
              for(var j=0;j<response.data.length;j++){
                //console.log(response.data[i])
                //Comparamos con todas las rutas que ya hay al haber realizado busqueda_plana() antes
                //y si coincide alguna con la recomendacion personal, se le añade el atributo 'Muy recomendada!'
                for(var k=0;k<this.rutas.length;k++){

                  if(response.data[j].nombre_ruta == this.rutas[k].nombre_ruta){
                    this.rutas[k].recomendada = 'Muy recomendada!';
                    break;
                  }

                }
                

              }
              this.mostrarBotonG = true;
              
            }
      })
      .catch((error) => {
          // handle error
          console.log(error);
      });

    }

  },

  depurar_usuarios_relacionados: function(){
    for(var n=0;n<this.usuarios_relacionados.length;n++){

        var aux = 0;
      for(var m=n;m<this.usuarios_relacionados.length;m++){
        if(this.usuarios_relacionados[n] == this.usuarios_relacionados[m]){
            aux++;
        }

        if(aux >= 3){//OJO CAMBIAR POR 3

            var yahay = false;
            if(this.usuarios_rel_def.length > 0){

              for(var t=0;t<this.usuarios_rel_def.length;t++){

                if(this.usuarios_rel_def[t] == this.usuarios_relacionados[n]){
                  yahay = true;
                  break;
                }
              }

              if(yahay == false){
                this.usuarios_rel_def.push(this.usuarios_relacionados[n]);
              }

            }else{
              this.usuarios_rel_def.push(this.usuarios_relacionados[n]);
            }
            break;
        }
      }
    }

    //Eliminamos al propio usuario de la lista, al usuario actual
    var x = this.usuarios_rel_def.indexOf( this.usuario );
    this.usuarios_rel_def.splice( x, 1 );

  },

  busqueda_plana: function(){
    console.log('busqueda plana')
    // Make a request
      axios
      .post('http://localhost:3000/busquedaplana', {
          usuario: this.usuario,
          dificultad: this.dificultad,
          epoca: this.epoca,
          tipo: this.tipo
      })
      .then((response) => {
          // handle success
            var json = {msg: 'Error'};

            if(JSON.stringify(response.data)==JSON.stringify(json)){
              alert('No hay rutas que mostrar')
            }else{
              
              //for(var j=0;j<response.data.length;j++){

                this.rutas = response.data;

              //}
              this.mostrarBotonG = true;
              
            }
      })
      .catch((error) => {
          // handle error
          console.log(error);
      });
  },

  buscar: function(){
    this.rutas = [];
    this.mostrarBotonG = false;
    if(this.rutaBuscarNombre.length == 0){
      this.algoritmo_de_recomendaciones()
    }else{
      this.buscar_por_nombre()
    }
  },

  cambiarALista: function(){
    this.$router.push({ name: 'Lista', params: { usuario: this.usuario } })
  }

 } 
}
</script>

<style>
  .principal { 
    background-size: cover;
    /* Ubicación de la imagen */
    background-image: url("../assets/FondoMontana.png");
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
