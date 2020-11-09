var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var cors = require('cors')
const neo4j = require('neo4j-driver')
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "12345"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.post("/registro", function (req, res) {
    var usuario = req.body.usuario;
    var nombre = req.body.nombre;
    var contrasena = req.body.contrasena;
    var anonacimiento = req.body.anonacimiento;
    var query = "CREATE (n:Persona{nombre:'" + nombre + "', nacimiento:" + anonacimiento + ", usuario:'" + usuario + "', password:'" + contrasena + "'})";

    const session = driver.session();

    const resultPromise = session.run(query);
    resultPromise.then(result => {
        
        res.json({
            msg: 'Bien'
        });
        session.close();
    })
    .catch((error) => {
        // handle error
        res.json({
            msg: 'Error'
        });
        console.log(error)
        session.close();
    })

    
});

app.post("/login", function (req, res) {
    var usuario = req.body.usuario;
    var contrasena = req.body.password;
    var query = "MATCH (n:Persona) WHERE n.usuario='" + usuario + "' AND n.password='" + contrasena + "' return n";

    const session = driver.session();

    const resultPromise = session.run(query);
    resultPromise.then(result => {
        

        if (result.records.length == 0) {
            res.json({
                msg: 'Error'
            })
        }
        else {
            var record = result.records[0].get(0).properties.usuario;
            res.send(record);
        }

        session.close();
  })
});

app.post("/buscarnombre", function (req, res) {
    var nombre = req.body.nombre;
    var rutas = [];
    /*var ruta =
    {
        nombre_ruta: '',
        distancia: '',
        tiempo: '',
        punto_salida: '',
        desnivel: '',
        circular: '',
        imagen: '',
        epoca: '',
        dificultad: '',
        tipo: ''
    };*/
    var query = "MATCH (r:Ruta)-[:HACER_EN]->(e), (r)-[:DIFICULTAD]->(d), (r)-[:TIPO]->(t) "
                +"WHERE TOLOWER(r.nombre)=~TOLOWER('.*"+nombre+".*') "
                +"RETURN r.nombre, r.distancia, r.tiempo, r.punto_salida, r.desnivel, r.circular, r.imagen, e.nombre, d.nombre, t.nombre";

    const session = driver.session();

    const resultPromise = session.run(query);
    resultPromise.then(result => {
        
        if (result.records.length == 0) {
            res.json({
                msg: 'Error'
            })
        }
        else {
            for(var i=0;i<result.records.length;i++){

                var ruta = {
                    nombre_ruta: result.records[i]._fields[0],
                    distancia: result.records[i]._fields[1],
                    tiempo: result.records[i]._fields[2],
                    punto_salida: result.records[i]._fields[3],
                    desnivel: result.records[i]._fields[4],
                    circular: result.records[i]._fields[5],
                    imagen: result.records[i]._fields[6],
                    epoca: result.records[i]._fields[7],
                    dificultad: result.records[i]._fields[8],
                    tipo: result.records[i]._fields[9],
                    recomendada: ''
                }

                rutas.push(ruta);

            }

            res.send(rutas)
            
        }

        session.close();
  })
});

app.post("/relacionbuena", function (req, res) {
    var usuario = req.body.usuario;
    var ruta = req.body.ruta;
    var query = "MATCH (p:Persona), (r:Ruta) "
                +"WHERE p.usuario= '"+usuario+"' AND r.nombre='"+ruta+"' AND NOT EXISTS((p)-[:HA_REALIZADO {experiencia: 'Buena'}]->(r)) "
                +"AND NOT EXISTS((p)-[:HA_REALIZADO {experiencia: 'Mala'}]->(r)) "
                +"CREATE (p)-[:HA_REALIZADO {experiencia: 'Buena'}]->(r) "
                +"RETURN p, r";

    const session = driver.session();

    const resultPromise = session.run(query);
    resultPromise.then(result => {
        
        if (result.records.length == 0) {
            res.json({
                msg: 'Error'
            })
        }
        else {
            
            res.send("Bien");
        }

        session.close();
  })
});

app.post("/relacionmala", function (req, res) {
    var usuario = req.body.usuario;
    var ruta = req.body.ruta;
    var query = "MATCH (p:Persona), (r:Ruta) " 
                +"WHERE p.usuario= '"+usuario+"' AND r.nombre='"+ruta+"' AND NOT EXISTS((p)-[:HA_REALIZADO {experiencia: 'Mala'}]->(r)) "
                +"AND NOT EXISTS((p)-[:HA_REALIZADO {experiencia: 'Buena'}]->(r)) "
                +"CREATE (p)-[:HA_REALIZADO {experiencia: 'Mala'}]->(r) "
                +"RETURN p, r";

    const session = driver.session();

    const resultPromise = session.run(query);
    resultPromise.then(result => {
        
        if (result.records.length == 0) {
            res.json({
                msg: 'Error'
            })
        }
        else {
            
            res.send("Bien");
        }

        session.close();
  })
});

app.post("/listarutas", function (req, res) {
    var usuario = req.body.usuario;
    var rutas = [];
    var query = "MATCH (p:Persona), (r:Ruta)-[:HACER_EN]->(e), (r)-[:DIFICULTAD]->(d), (r)-[:TIPO]->(t) "
                +"WHERE p.usuario='"+usuario+"' AND (p)-[:HA_REALIZADO {experiencia: 'Buena'}]->(r) "
                +"RETURN r.nombre, r.distancia, r.tiempo, r.punto_salida, r.desnivel, r.circular, r.imagen, e.nombre, d.nombre, t.nombre";

    const session = driver.session();

    const resultPromise = session.run(query);
    resultPromise.then(result => {
        
        if (result.records.length == 0) {
            res.json({
                msg: 'Error'
            })
        }
        else {
            for(var i=0;i<result.records.length;i++){

                var ruta = {
                    nombre_ruta: result.records[i]._fields[0],
                    distancia: result.records[i]._fields[1],
                    tiempo: result.records[i]._fields[2],
                    punto_salida: result.records[i]._fields[3],
                    desnivel: result.records[i]._fields[4],
                    circular: result.records[i]._fields[5],
                    imagen: result.records[i]._fields[6],
                    epoca: result.records[i]._fields[7],
                    dificultad: result.records[i]._fields[8],
                    tipo: result.records[i]._fields[9],
                    recomendada: ''
                }

                rutas.push(ruta);

            }

            res.send(rutas)
            
        }

        session.close();
  })
});

app.post("/usuariosrelacionados", function (req, res) {
    var ruta = req.body.ruta;
    var usuarios = [];
    var query = "MATCH (p:Persona), (p)-[:HA_REALIZADO]->(r) "+
                "WHERE r.nombre='"+ruta+"' "+
                "RETURN p.usuario";

    const session = driver.session();

    const resultPromise = session.run(query);
    resultPromise.then(result => {
        
        if (result.records.length == 0) {
            res.json({
                msg: 'Error'
            })
        }
        else {
            
            for(var i=0;i<result.records.length;i++){
                var usuario = result.records[i]._fields
                usuarios.push(usuario)
            }
            res.send(usuarios)
        }

        session.close();
  })
});

app.post("/rutasrecomendadas", function (req, res) {
    var usuario = req.body.usuario;
    var dificultad = req.body.dificultad;
    var epoca = req.body.epoca;
    var tipo = req.body.tipo;
    var rutas = [];
    var query = "MATCH (r:Ruta), (p:Persona), (p)-[:HA_REALIZADO {experiencia: 'Buena'}]->(r), (r)-[:DIFICULTAD]->(d), (r)-[:HACER_EN]->(e), (r)-[:TIPO]->(t) "
                +"WHERE p.usuario = '"+usuario+"' AND d.nombre = '"+dificultad+"' AND e.nombre = '"+epoca+"' AND t.nombre = '"+tipo+"' "
                +"RETURN r.nombre, r.distancia, r.tiempo, r.punto_salida, r.desnivel, r.circular, r.imagen";
    
    const session = driver.session();

    const resultPromise = session.run(query);
    resultPromise.then(result => {
        
        if (result.records.length == 0) {
            res.json({
                msg: 'Error'
            })
        }
        else {
            
            for(var i=0;i<result.records.length;i++){

                var ruta = {
                    nombre_ruta: result.records[i]._fields[0],
                    distancia: result.records[i]._fields[1],
                    tiempo: result.records[i]._fields[2],
                    punto_salida: result.records[i]._fields[3],
                    desnivel: result.records[i]._fields[4],
                    circular: result.records[i]._fields[5],
                    imagen: result.records[i]._fields[6],
                    epoca: epoca,
                    dificultad: dificultad,
                    tipo: tipo,
                    recomendada: 'Bien'
                }

                rutas.push(ruta);

            }

            res.send(rutas)
        }

        session.close();
  })
});

app.post("/busquedaplana", function (req, res) {
    var usuario = req.body.usuario;
    var dificultad = req.body.dificultad;
    var epoca = req.body.epoca;
    var tipo = req.body.tipo;
    var rutas = [];
    var query = "MATCH (r:Ruta), (p:Persona), (r)-[:DIFICULTAD]->(d), (r)-[:HACER_EN]->(e), (r)-[:TIPO]->(t) "
                +"WHERE p.usuario = '"+usuario+"' AND d.nombre='"+dificultad+"' AND e.nombre='"+epoca+"' AND t.nombre='"+tipo+"' "
                +"AND NOT EXISTS((p)-[:HA_REALIZADO {experiencia: 'Mala'}]->(r))"
                +"RETURN r.nombre, r.distancia, r.tiempo, r.punto_salida, r.desnivel, r.circular, r.imagen";

    const session = driver.session();

    const resultPromise = session.run(query);
    resultPromise.then(result => {
        
        if (result.records.length == 0) {
            res.json({
                msg: 'Error'
            })
        }
        else {
            
            for(var i=0;i<result.records.length;i++){

                var ruta = {
                    nombre_ruta: result.records[i]._fields[0],
                    distancia: result.records[i]._fields[1],
                    tiempo: result.records[i]._fields[2],
                    punto_salida: result.records[i]._fields[3],
                    desnivel: result.records[i]._fields[4],
                    circular: result.records[i]._fields[5],
                    imagen: result.records[i]._fields[6],
                    epoca: epoca,
                    dificultad: dificultad,
                    tipo: tipo,
                    recomendada: ''
                }

                rutas.push(ruta);

            }

            res.send(rutas)
        }

        session.close();
  })
});

app.listen(3000, function () {
    console.log('Backend listening on port 3000!');
  });