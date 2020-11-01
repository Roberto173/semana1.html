const express=require("express");
const app=express();

let persona = {
    nombre: "Roberto",
    apellido: "Gómez",
    edad: 47
};

app.get("/:nombre", function (req,res) {
    persona.nombre = req.params.nombre;
    res.send(persona);
})

app.get("/nombre/:apellido", function (req,res){
    persona.apellido = req.params.apellido;
    res.send(persona);
})

app.get("/nombre/apellido/:edad", function (req,res){
    persona.edad = parseInt(req.params.edad);
    res.send(persona);
})

app.listen(3000);