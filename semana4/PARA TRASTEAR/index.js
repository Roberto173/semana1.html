let selecCervezas = document.getElementById("nuestrasCervezas");
let nuestrasCervezas;
let opcionCerveza;
let tuCerveza;
let boton="";
let comparaCerveza;
let cerveza;
let cogerDatos="";
let entrada="";
let favorita="";
let miFavorita="";

let catalogo="";

fetch (`https://api.punkapi.com/v2/beers`).then (function (respuesta){ //Llamo a la url
    return respuesta.json();
    console.log(respuesta);                                            //Cojo la respuesta de la url con los datos que nos proporciona

}).then (function(datos){
    nuestrasCervezas = datos.results;
    for (let i=0; i<datos.length; i++) {                                //Paso los nombres de las cervezas al menú desplegable del HTML (SELECT)
        let opcionCerveza = `<option> ${datos[i].name}</option>`;
        selecCervezas.innerHTML += opcionCerveza;
    }
    
})

function mostrarInfoCerveza() {                                          //Llamo a la función con la opción seleccionada en el menú SELECT del HTML
    nuestrasCervezas = document.getElementById("nuestrasCervezas");
    let tuCerveza = nuestrasCervezas.value;                              //Paso a "tuCerveza" el valor de la opción seleccionada en el menu SELECT
    console.log(tuCerveza);
    fetch(`https://api.punkapi.com/v2/beers`).then (function (respuesta){//Vuelvo a hacer la llamada a la url para solicitar todos los datos
        return respuesta.json();

    }).then (function(datos){
        nuestrasCervezas = datos.results;
        for (let i=0; i<datos.length; i++) {                             //Ciclo for para comparar los datos recibidos de la url con la opción elegida en el SELECT

            comparaCerveza = datos[i].name;
            console.log(comparaCerveza);

            if (comparaCerveza === tuCerveza) {
                cerveza = `
                <div> 
                    <img src= ${datos[i].image_url} alt="" width=80px/>
                    <p>NOMBRE: ${datos[i].name} </p>
                    <p>ALCOHOL: ${datos[i].abv} % Vol </p>
                    <p> DESCRIPCIÓN: ${datos[i].description} </p>
                    <p> MARIDAJE: ${datos[i].food_pairing} </p>
                    <p> EL MAESTRO CERVECERO COMENTA: ${datos[i].brewers_tips} </p>
                </div>`;

            }
            document.getElementById("cerveza").innerHTML=cerveza;
        }
    })


}


function guardarDatos(){

        miFavorita=document.getElementById("nuestrasCervezas").value;
        console.log(miFavorita);
        localStorage.setItem("miFavorita" , JSON.stringify(miFavorita));

}

function recuperarDatos(){
        let favorita=JSON.parse(localStorage.getItem("miFavorita"));
        console.log(miFavorita);
}
