
let numeroAleatorio="";
let aleatorio = function(){
    numeroAleatorio=Math.floor(Math.random(9)*10);
    console.log(numeroAleatorio);
    return numeroAleatorio;
}

module.exports=aleatorio;