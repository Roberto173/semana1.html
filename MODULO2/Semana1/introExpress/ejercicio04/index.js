const express=require("express");  
const app=express();    
let saludo=require("./saludo.js");           

app.get("/saludame", function(req, res){
    res.send(saludo());
})


app.listen(3000); 