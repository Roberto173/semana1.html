function altaCliente() {
    const cif = document.getElementById("cif").value;
    const empresa = document.getElementById("empresa").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;

    const usuario = {
        empresa,
        cif,
        nombre,
        apellido,
        dni
    };

    fetch ("/coworking/usuarios/alta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
    }).then(function (res) {
        return res.json();
    }).then(function (data){
        console.log(data);
        console.log(`El cliente se ha registrado correctamente`);
    });
}

function cliente() {
    const cif = document.getElementById("cifUsuario").value;
    console.log(cif);
    
    fetch("/coworking/usuarios")
      .then(function (res){
        return res.json();
    }).then(function (datos){
        console.log(datos);
        let empresa="";

        for (let i=0; i<datos.length; i++){
        
            if (cif === datos[i].cif){
                empresa =`
                    <div>
                        <h3>Empresa: ${datos[i].empresa}</h3>
                        <h4>Persona de contacto: ${datos[i].apellido}, ${datos[i].nombre}</h4>
                    </div>`;
            }
            else  {
                console.log(`El cliente con CIF ${cif} no está registrado`);
            }
            document.getElementById("listadoClientes").innerHTML=empresa; 
        }
    })
}

function bajaCliente() {
    const cif = document.getElementById("cifBaja").value;
    const empresa = document.getElementById("empresaBaja").value;
    
    const usuario = {
        cif,
        empresa
    };

    fetch ("/coworking/usuarios/baja", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
    }).then(function (res) {
        return res.json();
    }).then(function (data){
        console.log(data);  // a partir de aquí pruebo un ciclo for para verificar que el cif existe
        let mensaje="";
        for (let i=0; i<data.length; i++){
            if(cif === data[i].cif){
                mensaje = `La empresa con CIF ${data[i].cif} se ha dado de baja correctamente`;
                console.log(mensaje);
            }
            else {
                console.log(`La empresa con CIF ${data[i].cif} no está dada de alta`);
            }
        }
    });
}

function modificarCliente() {
    const cif = document.getElementById("cifBaja").value;
    const empresa = document.getElementById("empresaBaja").value;
    const nombre = document.getElementById("nombreMod").value;
    const apellido = document.getElementById("apellidoMod").value;
    const dni = document.getElementById("dniMod").value;
    
    const usuario = {
        cif,
        empresa,
        nombre,
        apellido,
        dni
    };

    fetch ("/coworking/usuarios/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
    }).then(function (res) {
        return res.json();
    }).then(function (data){
        console.log(data);  
    });
}

function reservarSala() {
    
    const horaEntrada = document.getElementById("horaComienzo").value;
    const horaFin = document.getElementById("horaFin").value;
    const sala = document.getElementById("numeroSala").value;
    const fechaReserva = document.getElementById("fechaReserva").value;
    const cif = document.getElementById("cifUsuarioSala").value;
    console.log(sala, cif, fechaReserva, horaEntrada, horaFin);

    const reservaSala = {
        cif,
        sala,
        fechaReserva,
        horaEntrada,
        horaFin
    };

    fetch("/coworking/reservas/salas/editar", {
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reservaSala),
    })
        .then(function (res){
            return res.json();
        })
        .then(function (data){
            console.log(data);
        });
}

function anularReservaSala() {
    const sala = document.getElementById("numeroSala").value;
    const fechaReserva = document.getElementById("fechaReserva").value;
    const cif = document.getElementById("cifUsuarioSala").value;

    const anularReservaSala = {
        sala,
        fechaReserva,
        cif
    };

    fetch("/coworking/reservas/salas/baja", {
        method: "DELETE",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(anularReservaSala),
    })
        .then(function (res){
            return res.json();
        })
        .then(function (data){
            console.log(data);
        });
}