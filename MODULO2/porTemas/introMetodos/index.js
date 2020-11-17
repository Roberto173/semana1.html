const express=require("express");
const app=express();
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


let personas = [
    {
        nombre: "Pedro",
        apellido: "Ponce",
        edad: 34
    },
    {
        nombre: "Luis",
        apellido: "Ganzo",
        edad: 27
    },
    {
        nombre: "Marta",
        apellido: "Puy",
        edad: 35
    }
];

app.get("/personas", function(req, res){
    res.send(personas);
})

app.post("/personas", function (req,res){
    let persona = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad
    };
    personas.push(persona);
    res.send({mensaje: "Se ha añadido"});
})

app.listen(3000);