let planeta ="";



function fotoDelDia (){
let dia = document.getElementById("dia").Value;
let mes = document.getElementById("mes").Value;
let anyo = document.getElementById("Año").Value;
};

let url= `https://api.nasa.gov/planetary/apod?key=tgWLPehALg19DC9PVUjTpUJaH6Qnlv9Op8hOGEZK=${anyo}-${mes}-${dia}`;


fetch(url).then(function(recogerDatos){

    return respuesta.json();
    console.log(respuesta);

})

.then(function fotodeldia (datos){

    planeta = `
        <div>
        <img src = ${datos.url} alt="" />
        <h1> ${datos.title} </h1>
        <p> ${datos.explanation}</p>
        </div>
    `;

    document.getElementById("planeta").innerHTML=planeta;

});


