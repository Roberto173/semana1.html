const express = require ("express");
const mongodb = require ("mongodb");
const app = express();
const MongoClient = mongodb.MongoClient;

app.use(express.static("public"));  
app.use(express.urlencoded({extended: false}));
app.use(express.json());  


let db;

MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client){  //para conectarnos a la base de datos
    if(err !== null) {
        console.log(err);
    }
    else {
        db = client.db("mesas")
    }
})

app.get("/api/mesas", function (req, res){
    db.collection("mesas").find().toArray(function(err, datos){
        if (err !== null) {
            console.log(err);
            res.send({mensaje: "error:" + err});
        } else {
            console.log(datos);
            res.send(datos);
        }
    });
});

app.post("/api/anyadir", function (req, res){
    let mesa = {
        tamanyo: req.body.tamanyo,
        color: req.body.color,
        material: req.body.material,
        patas: req.body.patas,
    };
    db.collection("mesas").insertOne(mesa, function(err, respuesta){
        if (err !== null) {
            res.send({mensaje: "error:" + err});
        }else {
            res.send(respuesta);
        }
    })
})

//A partir de aquí, hecho en casa, sin revisar en clase

app.put("/api/modificar/:color", function (req, res){  //método put para modificar el color de mesa elegido a granate
    let color = req.params.color;                      //tomamos el parámetro color, introducido por el navegador
    db.collection("mesas").updateMany(
        {color: color}, 
        {$set:{color: "Granate"}}, 
        function (err, datos){
        if (err !== null) {
            res.send({mensaje: "error:" + err});
        }else {
            res.send(datos);
        }
        }
    );
});

app.delete("/api/borrar/:patas", function (req, res){  //método delete para borrar las mesas con el nº de patas que indiquemos
    let patas = parseInt(req.params.patas);                      //tomamos el parámetro patas, introducido por el navegador
    db.collection("mesas").deleteMany({patas: patas}, function (err, datos){ 
        if (err !== null) {
            res.send({mensaje: "error:" + err});
        }else {
            res.send(datos);
        }
    }
    );
});


app.listen(3000);