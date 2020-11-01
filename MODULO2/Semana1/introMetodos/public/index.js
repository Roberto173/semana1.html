fetch("/personas").then(function cogerRespuesta(respuesta){
    return respuesta.json()
}).then(function cogerDatos(datos){
    let mensaje="";
    for (let i=0; i<datos.length; i++){
        mensaje +=`
                    <h1>${datos[i].nombre} ${datos[i].apellido}</h1>
                    <p>Edad: ${datos[i].edad}</p>`;
    }
    document.getElementById("div1").innerHTML=mensaje;
    console.log(datos);
})

//Creamos una función que se va a llamar igual que el botón del formulario
//para leer los datos que introduzca el usuario

function anyadir() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = parseInt(document.getElementById("edad").value);
    console.log(nombre, apellido, edad);

    let persona = {
        nombre,
        apellido,
        edad,
    };

    //Ahora, tenemos que hacer FETCH
    fetch("/personas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //Aquí, lo que vamos a pasar en el BODY. El objeto PERSONA que
        //hemos obtenido del formulario.
        body: JSON.stringify(persona)

    }).then (function(respuesta){
        return respuesta.json();

    }).then (function (datos){
        console.log(datos);
    });
}