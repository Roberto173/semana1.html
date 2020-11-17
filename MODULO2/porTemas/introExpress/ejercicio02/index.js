const express = require("express");
const app = express();

let aleatorio ="";

app.get("/:parametro", function (request, response){
    let numero = parseInt(request.params.parametro);
    console.log(numero);
    aleatorio = Math.floor(Math.random()*numero) + 0;
    console.log(aleatorio);
    response.send(`Aleatorio es: ${aleatorio}`);
});


app.listen(3000);