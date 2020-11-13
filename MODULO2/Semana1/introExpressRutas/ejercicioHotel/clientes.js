const express = require("express");
const Router = express.Router();

Router.get("/", function (req, res){  //RUTA PARA MOSTRAR LISTADO DE CLIENTES
    let db = req.app.locals.db;
    db.collection("clientes").find().toArray(function (err, datos){
        if (err !== null) {
            res.send (err);
        }
        else {
            res.send(datos);
        }  
    });
});

Router.post("/alta", function (req, res){  //RUTA PARA DAR DE ALTA A UN CLIENTE
    let db = req.app.locals.db;
    let cliente = {                                   
        nombre: req.body.nombre,                      
        apellido: req.body.apellido,
        dni: req.body.dni                             
    };
    db.collection("clientes").insertOne(cliente, function (err, datos){
        if (err !== null) {
            res.send (err);
        }
        else {
            res.send(datos);
        }
    });
});

Router.put("/editar", function (req, res){   //RUTA PARA EDITAR AL CLIENTE
    let db = req.app.locals.db;
    let dni = req.body.dni;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    db.collection("clientes").updateOne({dni: dni}, 
                                        {$set: {nombre: nombre}}, 
                                        {$set: {apellido: apellido}},
                                        {multi:true},
                                         function (err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
    });
});

module.exports = Router;
