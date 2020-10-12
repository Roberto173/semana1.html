
function fotodelDia(){

let anio = document.getElementById("anio").value;
console.log(anio);
let mes = document.getElementById("mes").value;
console.log(mes);
let dia = document.getElementById("dia").value;
console.log(dia);

}

fetch(`https://api.nasa.gov/planetary/apod?api_key=tgWLPehALg19DC9PVUjTpUJaH6Qnlv9Op8hOGEZK&date=${anio}-${mes}-${dia}`).then (function (response){
    return response.json();
})
    .then(function (datos){

        console.log(datos);
    });
