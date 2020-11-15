const express = require("express");
const app = express();


app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const usuarios = require("./usuarios.js");
const salas = require("./salas.js");
const puestos = require("./puestos.js");
const cocina = require("./cocina.js");

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;


MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
    if (err !== null){
        console.log(err);
    }
    else {
        app.locals.db = client.db("coworking");
    }
})



app.use("/coworking/usuarios", usuarios);
app.use("/coworking/salas", salas);
app.use("/coworking/puestos", puestos);
app.use("/coworking/cocina", cocina);

app.listen(3000);