fetch("/nuevo", {
    method: "POST",
    headers: {
            "Content-Type": "application/json"
        },
    body: JSON.stringify(nuevo)
}).then(function (nuevo){
    return respuesta.json();
}).then(function (datos){
    let nuevoProducto = {
        nombre,
        descripcion,
        img,
        precio,
    };
})

fetch("/")
  .then(function (respuesta) {
    return respuesta.json();
  })
  .then(function (datos) {
    let armarios = "";
    let sillas = "";
    let mesas = "";
    for (let i = 0; i < datos.armarios.length; i++) {
      armarios += `
            <h1>${datos.armarios[i].nombre}</h1>
            <p>Descripción: ${datos.armarios[i].descripcion}</p>
            <p>Precio: ${datos.armarios[i].precio}</p>
            <img src="${datos.armarios[i].img}" alt="" />
         `;
    }
    for (let i = 0; i < datos.sillas.length; i++) {
      sillas += `
        <h1>${datos.sillas[i].nombre}</h1>
        <p>Descripción: ${datos.sillas[i].descripcion}</p>
        <p>Precio: ${datos.sillas[i].precio}</p>
        <img src="${datos.sillas[i].img}" alt="" />
     `;
    }

    for (let i = 0; i < datos.mesas.length; i++) {
      mesas += `
        <h1>${datos.mesas[i].nombre}</h1>
        <p>Descripción: ${datos.mesas[i].descripcion}</p>
        <p>Precio: ${datos.mesas[i].precio}</p>
        <img src="${datos.mesas[i].img}" alt="" />
     `;
    }
    document.getElementById("div1").innerHTML = armarios + sillas + mesas;
  });

  function nuevo() {
    let seccion = document.getElementById("seccion").value;
    fetch(`/nuevo/${seccion}`)
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (datos) {
        if (datos.error) {
          window.alert(datos.mensaje);
        } else {
          let productos = "";
          for (let i = 0; i < datos.length; i++) {
            productos += `
              <h1>${datos[i].nombre}</h1>
              <p>Descripción: ${datos[i].descripcion}</p>
              <p>Precio: ${datos[i].precio}</p>
              <img src="${datos[i].img}" alt="" />
              `;
          }
          document.getElementById("div1").innerHTML = productos;
        }
      });
  }  