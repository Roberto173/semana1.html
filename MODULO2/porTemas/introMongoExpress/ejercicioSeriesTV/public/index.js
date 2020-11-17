
function mostrar(){
    fetch("/api/series")
        .then(function(res){
            return res.json();
        }).then(function(datos){
            let series="";
            for (let i=0; i<datos.length; i++) {
                series += `
                            <div>
                                <h3>Nombre de la serie: ${datos[i].titulo} </h3>
                                <h5>Valoración: ${datos[i].nota} puntos</h5>
                            </div>`;
            }
            document.getElementById("div1").innerHTML = series;
        })
}

function buscar(){
    const buscar = document.getElementById("buscar").value;
    console.log (buscar);
    fetch("/api/serie")
        .then(function(res){
            return res.json();
        }).then(function(datos){
            let serie = "";
            for (let i=0; i<datos.length; i++){
                    if (buscar === datos[i].titulo){
                    serie = `
                            <div>
                                <h3>Serie: ${datos[i].titulo}</h3>
                                <h5>Plataforma: ${datos[i].plataforma}</h5>
                                <h5>Valoración: ${datos[i].nota} puntos</h5>
                            </div>`;
                }
                    else {
                        //alert();
                        console.log("error");
                }
                document.getElementById("div1").innerHTML = serie;
            }
        })
}

function anyadir(){
    const titulo = document.getElementById("titulo").value;
    const plataforma = document.getElementById("plataforma").value;
    const nota = document.getElementById("nota").value;

    const serie = {
        titulo,
        plataforma,
        nota
    }

    let nueva = "";

    fetch("/api/nuevaSerie", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(serie),
    })
    .then(function(res){
        return res.json;
    })
    .then(function(datos){
        nueva = `<div>
                 <h3>Se ha añadido la serie</h3>
                 <h4>Título: ${titulo}</h4>
                 <h4>Plataforma: ${plataforma}</h4>
                 <h4>Valoración: ${nota} puntos</h4>
                 </div>`;
        document.getElementById("div1").innerHTML = nueva;
    })
}



function alert() {
    window.alert("La serie buscada no está en la base de datos");
}
