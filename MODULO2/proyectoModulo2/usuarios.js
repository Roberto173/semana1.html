const express = require("express");
const Router = express.Router();

Router.get("/", function (req, res){  //RUTA PARA MOSTRAR LISTADO DE USUARIOS
    let db = req.app.locals.db;
    db.collection("usuarios").find().toArray(function (err, datos){
        if (err !== null) {
            res.send (err);
        }
        else {
            res.send(datos);
        }  
    });
});

Router.post("/alta", function (req, res){  //RUTA PARA DAR DE ALTA A UN USUARIO
    let db = req.app.locals.db;
    let usuario = {   
        empresa: req.body.empresa,
        cif: req.body.cif,                                
        nombre: req.body.nombre,                      
        apellido: req.body.apellido,
        dni: req.body.dni                             
    };
    db.collection("usuarios").insertOne(usuario, function (err, datos){
        if (err !== null) {
            res.send (err);
        }
        else {
            res.send(datos);
        }   
    });
});

Router.put("/editar", function (req, res){   //RUTA PARA EDITAR AL USUARIO
    let db = req.app.locals.db;
    let cif = req.body.cif;
    let nombre = req.body.nombre;
    let empresa = req.body.empresa;
    let apellido = req.body.apellido;
    let dni = req.body.dni;
    
    db.collection("usuarios").updateOne({cif: cif},             //COMPRUEBO EL CIF Y MODIFICO EL RESTO DE LOS DATOS
                                        {$set: {empresa: empresa,
                                               nombre: nombre,
                                               apellido: apellido,
                                               dni: dni}},
                                         function (err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
        });
});

Router.delete("/baja", function (req, res){  //RUTA PARA DAR DE BAJA A UN USUARIO
    let db = req.app.locals.db;
    let empresa = req.body.empresa;
    db.collection("usuarios").deleteOne({empresa: empresa}, function (err, datos){
        if (err !== null) {
            res.send (err);
        }
        else {
            res.send(datos);
        }
    });
});

module.exports = Router;