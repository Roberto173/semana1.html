const express=require("express"); 
const app=express();               

let array = ["Pedro", "Luis", "Manuel", "José", "Juanjo"];

app.get("/personas", function(req, res) {
    let listaPersonas = "";
    for (let i=0; i<array.length; i++) {
        listaPersonas += `<h1> ${array[i]} </h1>`;
    }
    res.send (`Lista de personas es: ${listaPersonas}`);
});

app.get("/personas/:parametro", function(req, res){
    let parametro = parseInt(req.params.parametro)-1;
    console.log(parametro);
    res.send(`La persona en el puesto ${parametro} de la lista es: ${array[parametro]}`);
});

app.get("/personas/:nombre", function(req, res) {
    let nombre = req.params.nombre;
    console.log(nombre);
    for (let i=0; i<array.length; i++) {
        if (nombre === array[i]) {
            //res.send(`La persona: ${nombre}, sí está en la lista`);
            res.send(array[i]);
        }
    };
    //else {
        res.send(`La persona: ${nombre}, no está en la lista`);
    //};
});

app.listen(3000);                  