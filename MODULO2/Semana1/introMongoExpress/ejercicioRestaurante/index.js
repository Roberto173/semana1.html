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

app.get("/api/menus", function(req, res){
    db.collection("menus").find().toArray (function(err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
})

app.post("/api/nuevoMenu", function (req, res){
    let menu = {
        numero: req.body.numero,
        primero: req.body.primero,
        postre: req.body.postre,
        segundo: req.body.segundo,
        precio: req.body.precio
    }
    db.collection("menus").insertOne(menu, function (err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
})

app.put("api/editarMenu", function (req, res){
    let numero = req.body.numero;
    let primero = req.body.primero;
    let postre = req.body.postre;
    let segundo = req.body.segundo;
    let precio = req.body.precio;
    db.collection("menus")
    .updateOne({numero: numero},
        {$set:{primero: primero,
        postre: postre,
        segundo: segundo,
        precio: precio}}, function(err, datos){
        if (err !== null){
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
})

app.delete("/api/borrarMenu", function (req, res){
    let numero = req.body.numero;
    db.collection("menus").deleteOne({numero: numero}, function (err, datos){
        if (err !== null){
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
})

app.listen(3000);