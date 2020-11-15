const express = require("express");
const Router = express.Router();

Router.get("/", function (req, res){   //RUTA PARA MOSTRAR  LA COCINA Y SU ESTADO
    let db = req.app.locals.db;
    db.collection("cocina").find().toArray(function (err, datos){
        if (err !== null){
            res.send(err);
        }
        else {
            res.send(datos);
        }
    });
});

Router.post("/alta", function (req, res){  //RUTA PARA CREAR LA COCINA Y SU INFORMACIÓN
    let db = req.app.locals.db;
    let cocina = {
        estado: req.body.estado,
        fechaReserva: req.body.fechaReserva,
        horaComienzo: req.body.horaComienzo,
        horaFin: req.body.horaFin
    }
    db.collection("cocina").insertOne(cocina, function (err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
});

Router.put("/editar", function (req, res){   //RUTA PARA EDITAR ESTADO DE LA COCINA
    let db = req.app.locals.db;
    let estado = req.body.estado;
    let fechaReserva = req.body.fechaReserva;
    let horaComienzo = req.body.horaComienzo;
    let horaFin = req.body.horaFin;
    db.collection("cocina").updateOne({numero: numero},
                                            {$set: {estado: estado,
                                                    fechaReserva: fechaReserva,
                                                    horaComienzo: horaComienzo,
                                                    horaFin: horaFin}},
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