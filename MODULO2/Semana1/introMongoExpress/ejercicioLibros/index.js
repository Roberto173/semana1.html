const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
    if (err !== null){
        console.log(err);
    }
    else {
        db = client.db("mesas");
    }
})


app.get("/api/libros", function (req, res){
    db.collection("libros").find().toArray(function (err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
})

app.post("/api/nuevoLibro/:titulo", function (req, res){
    let titulo = req.params.titulo;
    let nuevoLibro = {
        titulo: titulo,
        estado: "sin leer"
    }
    db.collection("libros").insertOne(nuevoLibro, function(err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            db.collection("libros").find().toArray(function (err, data){
                if (err !== null) {
                    res.send(err);
                }
                else {
                    res.send(data);
                }
            })  
        }
    })
})

app.get("/api/libros/:titulo", function (req, res){
    let titulo = req.params.titulo;
    db.collection("libros").find({titulo: titulo}).toArray(function(err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
            }
    })       
})

app.put("/api/editarLibro/:titulo", function (req, res){
    let titulo = req.params.titulo;
    db.collection("libros").update({titulo: titulo}, {$set:{estado: "leído"}}, function(err, datos){
        if (err !== null){
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
})

app.delete("/api/borrarLibro/:titulo", function(req, res){
    let titulo = req.params.titulo;
    db.collection("libros").deleteOne({titulo: titulo}, function (err, datos){
        if (err !== null){
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
})

app.listen(3000);