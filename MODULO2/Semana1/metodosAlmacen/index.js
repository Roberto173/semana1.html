const express=require("express");
const app=express();

const almacen = require("./almacen.js");

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/almacen", function(req, res){
    res.send(almacen);
})


app.get("/almacen/:seccion", function(req, res){
    let tipo=req.params.seccion;
        if (almacen[tipo] === undefined) {
            res.send(`Error. La sección no existe.`);
    }
        else {
            res.send(almacen[tipo]);
        }
    res.send(`La lista de armarios existentes es: ${listaArmarios}`);
})


app.post("/almacen", function(req, res){        //ruta para añadir un objeto al almacén, en su sección correspondiente 
    let seccion = req.body.seccion;             //cogemos los datos que nos llegan por el body (fetch).
    let nombre = req.body.nombre;               //el {body} es un objeto que se encuentra dentro del objeto {req}
    let precio = req.body.precio;
    let descripcion = req.body.descripcion;
    let img = req.body.img;
    let producto = {                            //definimos el objeto con los parámetros que necesitamos, para añadirlo al almacén
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        img: img,
    };

    if(almacen[seccion] !== undefined){
        almacen[seccion].push(producto);
        res.send(almacen);
    }
    else{
        res.send("Error");
    }
})

app.put("/almacen", function (req, res) {       //Ruta para editar un producto del almacén
    let nombre = req.body.nombre;               //cogemos los datos que nos llegan por el body
    let seccion = req.body.seccion;             //{body} es un objeto que se encuentra dentro del objeto {req}
    let referencia = req.body.referencia;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let imagen = req.body.img;
  
    let boolean = false;
    if (almacen[seccion] !== undefined) {
      for (let i = 0; i < almacen[seccion].length; i++) {   //ciclo para recorrer la sección y buscar el 
        if (referencia === almacen[seccion][i].nombre) {    //producto que queremos modificar
          almacen[seccion][i].nombre = nombre;
          almacen[seccion][i].precio = precio;
          almacen[seccion][i].descripcion = descripcion;
          almacen[seccion][i].img = imagen;
          boolean = true;
        }
      }
    }
    if (boolean) {
      res.send(almacen);
    } else {
      res.send({ mensaje: "error" });
    }
  });
  
  app.delete("/almacen", function (req, res) {
    let seccion = req.body.seccion;
    let nombre = req.body.nombre;
    let boolean = false;
    for (let i = 0; i < almacen[seccion].length; i++) {
      if (almacen[seccion][i].nombre === nombre) {
        almacen[seccion].splice(i, 1);
        boolean = true;
      }
    }
  
    boolean ? res.send(almacen) : res.send({ mensaje: "error" });
  });
  
  app.listen(3000);