const express = require("express");
const Router = express.Router();

Router.get("/", function (req, res){   //RUTA PARA MOSTRAR TODOS LOS PUESTOS Y SU ESTADO
    let db = req.app.locals.db;
    db.collection("puestos").find().toArray(function (err, datos){
        if (err !== null){
            res.send(err);
        }
        else {
            res.send(datos);
        }
    });
});

Router.post("/alta", function (req, res){  //RUTA PARA CREAR LA SALA Y SU INFORMACIÓN
    let db = req.app.locals.db;
    let puesto = {
        numero: req.body.numero,
        estado: req.body.estado,
        fechaReserva: req.body.fechaReserva
    }
    db.collection("puestos").insertOne(puesto, function (err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
});

Router.put("/editar", function (req, res){   //RUTA PARA EDITAR ESTADO DEL PUESTO
    let db = req.app.locals.db;
    let numero = req.body.numero;
    let estado = req.body.estado;
    let fechaReserva = req.body.fechaReserva;
    db.collection("puestos").updateOne({numero: numero},
                                            {$set: {estado: estado,
                                                   fechaReserva: fechaReserva}},
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