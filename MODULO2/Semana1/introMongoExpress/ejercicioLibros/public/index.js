
//mostrarLibros();

//function noExiste(){
//    window.alert("El libro buscado no existe");
//}

function mostrarTodo(){
    fetch("/api/libros")
        .then(function (res){
            return res.json();
        }).then(function (datos){
            let libros ="";
            for (let i=0; i<datos.length; i++) {
                libros += `<div>
                           <h3>Título: ${datos[i].titulo}</h3>
                           <p>Estado: ${datos[i].estado}</p>
                           <br>
                           </div>`;
            }
            document.getElementById("div1").innerHTML = libros;
        })
}

function buscar(){
    const mostrar = document.getElementById("mostrar").value;
    fetch(`/api/libros/${mostrar}`)
        .then(function (res){
            return res.json();
        }).then(function (datos){
            let libro ="";
                for (let i=0; i<datos.length; i++){
                    if (mostrar === datos[i].titulo){
                    libro = `<div>
                    <h3>Título: ${datos[i].titulo}</h3>
                    <p>Estado: ${datos[i].estado}</p>
                    <br>
                    </div>`;
                    }
                    else {
                        noExiste();
                    }
                }
            document.getElementById("div1").innerHTML = libro;
        })
}

function anyadir(){
    const titulo = document.getElementById("anyadir").value;
    const estado = "sin leer";
    console.log(titulo);
    const libro = {
        titulo,
        estado
    };
    let nuevo = "";

    fetch(`/api/nuevoLibro/${titulo}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(libro),
    })
    .then(function(res){
        return res.json;
    })
    
    .then(function(datos){
            nuevo = `<div> 
                 <h3> Se ha añadido el libro </h3>
                 <h4> Título: ${titulo} </h4>
                 </div>`;
            document.getElementById("div1").innerHTML = nuevo;
    })
}

function borrar(){
    const titulo = document.getElementById("borrar").value;
    const estado = "";
    const libro = {
        titulo,
        estado
    };
    let libroBorrado = "";

    fetch(`/api/borrarLibro/${titulo}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(libro),
    })
    .then(function(res){
        return res.json;
    })
    .then(function(datos){

        libroBorrado = `<div> 
        <h3> Se ha eliminado el libro </h3>
        <h4> Título: ${titulo} </h4>
        </div>`
        document.getElementById("div1").innerHTML = libroBorrado;
    })
}

function noExiste(){
    window.alert("El libro buscado no existe");
}