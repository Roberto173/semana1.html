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

app.get("/api/series", function (req, res){
    db.collection("series").find().toArray(function (err, datos){
        if (err !== null){
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
})

app.post("/api/nuevaSerie", function (req, res){
    let nuevaSerie = {
        titulo: req.body.titulo,
        plataforma: req.body.plataforma,
        nota: parseInt(req.body.nota)
    }
    db.collection("series").insertOne(nuevaSerie, function(err, datos){
        if (err !== null){
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
})

app.get("/api/serie", function (req, res){
    let serie = req.body.serie;
    db.collection("series").find({titulo: serie}).toArray(function (err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
})

app.listen(3000);