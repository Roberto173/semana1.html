const express = require("express");
const Router = express.Router();

Router.get("/", function (req, res){   //RUTA PARA MOSTRAR TODAS LAS HABITACIONES Y SU ESTADO
    let db = req.app.locals.db;
    db.collection("habitaciones").find().toArray(function (err, datos){
        if (err !== null){
            res.send(err);
        }
        else {
            res.send(datos);
        }
    });
});

Router.post("/anyadir", function (req, res){  //RUTA PARA CREAR LA HABITACIÓN Y SU INFORMACIÓN
    let db = req.app.locals.db;
    let habitacion = {
        numero: req.body.numero,
        estado: req.body.estado,
        fechaEntrada: req.body.fechaEntrada,
        fechaSalida: req.body.fechaSalida
    }
    db.collection("habitaciones").insertOne(habitacion, function (err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
});

Router.put("/editar", function (req, res){   //RUTA PARA EDITAR LA HABITACIÓN
    let db = req.app.locals.db;
    let numero = req.body.numero;
    let estado = req.body.estado;
    let fechaEntrada = req.body.fechaEntrada;
    let fechaSalida = req.body.fechaSalida;
    db.collection("habitaciones").updateOne({numero: numero},
                                            {$set: {estado: estado}, 
                                             $set: {fechaEntrada: fechaEntrada},
                                             $set: {fechaSalida: fechaSalida}},
                                             {multi:true}, function (err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
    });
});

module.exports = Router;