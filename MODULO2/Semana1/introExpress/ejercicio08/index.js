const { response } = require("express");
const express=require("express");
const app=express();
const aleatorio=require("../ejercicio07/aleatorio");

let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


app.get("/aleatorio", function(req, res){
    let numero="";
    numero=aleatorio();
    //for (let i=0; i<array.length; i++) {
        array[numero] = array[numero] + 1;
        
    //}
    res.send(array);
})



app.get("/borrar/:numero", function(req,res){
    let numero = parseInt(req.params.numero);
    for (let i=0; i<array.length; i++) {
        if (numero === array[i]){
            array[i] = 0;
        }
    }
    res.send(array);
})

app.listen(3000);