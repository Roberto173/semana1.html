const express = require("express");
const Router = express.Router();

Router.get("/", function (req, res){   //RUTA PARA MOSTRAR TODAS LAS SALAS Y SU ESTADO
    let db = req.app.locals.db;
    db.collection("salas").find().toArray(function (err, datos){
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
    let sala = {
        numero: req.body.numero,
        estado: req.body.estado,
        fechaReserva: req.body.fechaReserva,
        horaComienzo: req.body.horaComienzo,
        horaFin: req.body.horaFin
    }
    db.collection("salas").insertOne(sala, function (err, datos){
        if (err !== null) {
            res.send(err);
        }
        else {
            res.send(datos);
        }
    })
});

Router.put("/editar", function (req, res){   //RUTA PARA EDITAR LA SALA
    let db = req.app.locals.db;
    let numero = req.body.numero;
    let estado = req.body.estado;
    let fechaReserva = req.body.fechaReserva;
    let horaComienzo = req.body.horaComienzo;
    let horaFin = req.body.horaFin;
    db.collection("salas").updateOne({numero: numero},
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


Router.post("/reserva", function (req, res){  //RUTA PARA RESERVAR UNA SALA
    
    console.log(req.body);
    const db = req.app.locals.db;
    const cif = req.body.cif;
    const numero = req.body.numero;
    const fechaReserva = req.body.fechaReserva;
    const horaComienzo = req.body.horaComienzo;
    const horaFin = req.body.horaFin;

    const sala = {
        cif,
        numero,
        fechaReserva,
        horaComienzo,
        horaFin
    };
    //VAMOS A BUSCAR USUARIO PARA SABER SI ESTÁ DADO DE ALTA
    db.collection("usuarios").find({cif: cif}).toArray(function (err, usuario){
        if (err !== null) {
            res.send(err);
        }else {
            if (usuario.length === 0) {
                res.send({mensaje: "El usuario no está registrado"});  //SI NO ESTÁ REGISTRADO, MANDAMOS MENSAJE DE AVISO
            }
            else {    //SI ESTÁ REGISTRADO, BUSCAMOS LA FECHA SOLICITADA PARA LA RESERVA
                db.collection("reservas").find({fechaReserva: fechaReserva}).toArray(function (err, sala){
                    if (err !== null){
                        res.send(err);
                    }else {
                        if (sala[0].fechaReserva === fechaReserva){ //SI LA FECHA SOLICITADA PARA LA RESERVA SE CORRESPONDE CON UNA FECHA QUE YA CONTIENE UNA RESERVA
                            
                        }
                    }
                })
            }
        }
    })

});
       
           


module.exports = Router;