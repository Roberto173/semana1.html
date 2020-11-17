const express = require("express");
const Router = express.Router();

Router.get("/", function (req, res){   //RUTA PARA MOSTRAR  LA COCINA Y SU ESTADO
    let db = req.app.locals.db;
    db.collection("reservas").find().toArray(function (err, datos){
        if (err !== null){
            res.send(err);
        }
        else {
            res.send(datos);
        }
    });
});

Router.post("/salas", function (req, res){  
    let db = req.app.locals.db;
    let reserva = {
        estado: "ocupada",
        fechaReserva: req.body.fechaReserva,
        horaComienzo: req.body.horaComienzo,
        horaFin: req.body.horaFin
    }
    db.collection("reservas").insertOne(reserva, function (err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
});

Router.put("/salas/editar", function (req, res){   //RUTA PARA EDITAR ESTADO DE LA RESERVA
    let db = req.app.locals.db;
    let fechaReserva = req.body.fechaReserva;
    let horaComienzo = req.body.horaComienzo;
    let horaFin = req.body.horaFin;
    db.collection("reservas").updateOne({fechaReserva: fechaReserva},
                                            {$set: {horaComienzo: horaComienzo,
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

Router.delete("/salas/baja", function (req, res){  //RUTA PARA DAR DE BAJA LA RESERVA DE UN USUARIO
    let db = req.app.locals.db;
    let numero = req.body.numeroSala;
    let cif = req.body.cifUsuarioSala;
    let fechaReserva = req.body.fechaReserva;
    //COMPROBAMOS SI EL USUARIO ESTÁ REGISTRADO USANDO EL CIF INTRODUCIDO POR TECLADO
    db.collection("usuarios").find({cif: cif}).toArray(function(err, usuario){
        if(err !== null){
            res.send(err);
        }else {
            if (usuario.length === 0) {
                res.send({mensaje: "El usuario no está registrado"});
            }else{                                                      //AHORA COMPROBAMOS EL Nº DE SALA
                db.collection("salas").find({numero: numero}).toArray(function(err, sala){
                    if(err !== null){
                        res.send(err);
                    }else {
                        if(sala.length === 0) {
                            res.send({mensaje: "No tiene ninguna reserva para esta sala"});
                        }else {                                         //POR ÚLTIMO, BORRAMOS LA RESERVA, USANDO LA FECHA
                            db.collection("reservas").deleteOne({fechaReserva: fechaReserva}, function (err, datos){
                                if (err !== datos){
                                    res.send(err);
                                }else {
                                    res.send(datos);
                                }
                            });
                        }
                    }
                })
            }
        }
    });
});

module.exports = Router;