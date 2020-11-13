const express = require("express");
const app = express();


app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const clientes = require("./clientes.js");
const habitaciones = require("./habitaciones.js");


const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;


MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
    if (err !== null){
        console.log(err);
    }
    else {
        app.locals.db = client.db("hotel");
    }
})



app.use("/hotel/clientes", clientes);
app.use("/hotel/habitaciones", habitaciones);

app.listen(3000);