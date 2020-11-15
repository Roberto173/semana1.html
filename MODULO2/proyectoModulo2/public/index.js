function altaCliente() {
    const cif = document.getElelementById("cif").value;
    const empresa = document.getElelementById("empresa").value;
    const nombre = document.getElelementById("nombre").value;
    const apellido = document.getElelementById("apellido").value;
    const dni = document.getElelementById("dni").value;

    const usuario = {
        empresa,
        cif,
        nombre,
        apellido,
        dni
    };

    fetch ("/alta", {
        method: "POST",
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

