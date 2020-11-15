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
////////////////////////////////////////////////////////////////////

Router.post("/reserva", function (req, res){  //RUTA PARA RESERVAR UNA SALA
    let db = req.app.locals.db;
    let cif = req.body.cif;
    let numero = req.body.numero;
    let fechaReserva = req.body.fechaReserva;
    let horaComienzo = req.body.horaComienzo;
    let horaFin = req.body.horaFin;
    
    db.collection("usuarios").find({cif: cif}).toArray(function (err, usuario){  //COMPROBAMOS SI EL USUARIO ESTÁ DADO DE ALTA
        if (err !== null) {
            res.send(err);
        }
        else {
            if (usuario.length === 0){
                res.send({mensaje: "El usuario no está registrado"});  //MENSAJE SI USUARIO NO ESTÁ DADO DE ALTA
            }
            else {
                db.collection("salas").find({numero: numero}).toArray(function(err, sala){  //SI USUARIO SÍ ESTÁ DADO DE ALTA, COMPROBAMOS ESTADO DE LA SALA
                    if(err !== null){
                        res.send(err);
                    }
                    else {
                        if(salas[0].estado==="ocupada") {
                            res.send({mensaje: "La sala no está disponible en esta fecha/horario"});
                        }
                        else {
                            db.collection("salas").insertOne({numero: numero},
                                                             {$set: {cif: cif,
                                                                    fechaReserva: fechaReserva,
                                                                    horaComienzo: horaComienzo,
                                                                    horaFin: horaFin}},
                                                             function (err, datos){
                                if (err !== null) {
                                    res.send(err);
                                }
                                 else  {
                                    db.collection("salas").updateOne({numero: numero}, 
                                                                      {$set: {estado: "Ocupada",
                                                                              fechaReserva: fechaReserva,
                                                                              horaComienzo: horaComienzo,
                                                                              horaFin: horaFin}},
                                                                              function (err,data){
                                    if (err !== null) {
                                        res.send(err);
                                    }
                                    else {
                                        res.send({mensaje: "Reserva realizada"});
                                    }
                                    });    
                                 }                          
                             });
                        }
                    }
                });
            }
        }
    });
});


module.exports = Router;