const express=require("express");
const app=express();
let aleatorio=require("./aleatorio.js"); 

let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

app.get("/aleatorio", function(req, res){
    let numero="";
    numero=aleatorio();
    //for (let i=0; i<array.length; i++) {
        array[numero] = array[numero] + 1;
        
    //}
    res.send(array);
})

app.listen(3000);