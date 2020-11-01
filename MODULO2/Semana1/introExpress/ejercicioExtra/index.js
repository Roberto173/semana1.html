const express=require("express");
const app=express();

let cesta=[];

let fruteria = [
    {nombre: "manzanas",
     precio: 0.90,
     stock: 100
    },
    {nombre: "peras",
     precio: 1.10,
     stock: 60
    }
];

let carniceria = [
    {nombre: "costilla",
     precio: 2.30,
     stock: 100
    },
    {nombre: "lomo",
     precio: 1.90,
     stock: 60
    }
];

    console.log(fruteria);
    console.log(carniceria);
    let almacen = [fruteria, carniceria];
    console.log(almacen);
    

app.get("/departamento/fruteria", function(req,res){
    let tablaFrutas="";
    for (let i=0; i<fruteria.length; i++) {
        tablaFrutas += `<tr>
                    <td><h1>Sección: Frutería</h1></td>
                    <td><h3>Producto: ${fruteria[i].nombre}</h3></td>
                    <td>Precio: ${fruteria[i].precio} €</td>
                    <td>Stock: ${fruteria[i].stock} Kg</td>
                    </tr>`;
    }
        res.send(tablaFrutas);
})

    app.get("/departamento/carniceria", function(req,res){
        let tablaCarnes="";
        for (let i=0; i<carniceria.length; i++) {
            tablaCarnes += `<tr>
                        <td><h1>Sección: Carnicería</h1></td>
                        <td><h3>Producto: ${carniceria[i].nombre}</h3></td>
                        <td>Precio: ${carniceria[i].precio} €</td>
                        <td>Stock: ${carniceria[i].stock} Kg</td>
                        </tr>`;
        }
            res.send(tablaCarnes);
    })

    app.get("/departamento/fruteria/:producto/:cantidad", function(req,res){
        let producto = req.params.producto;
        let cantidad = parseInt(req.params.cantidad);
        console.log(producto);
        console.log(cantidad);
            for (let i=0; i<fruteria.length; i++){
                if (producto === fruteria[i].nombre && cantidad <= fruteria[i].stock) {
                    fruteria[i].stock = fruteria[i].stock - cantidad;
                    cesta.push({producto: producto, cantidad: cantidad, stock: fruteria[i].stock});
                    res.send(cesta);
                }
            }
            }
    );

    app.get("/departamento/carniceria/:producto/:cantidad", function(req,res){
        let producto = req.params.producto;
        let cantidad = parseInt(req.params.cantidad);
        console.log(producto);
        console.log(cantidad);
            for (let i=0; i<carniceria.length; i++){
                if (producto === carniceria[i].nombre && cantidad <= carniceria[i].stock) {
                    carniceria[i].stock = carniceria[i].stock - cantidad;
                    cesta.push({producto: producto, cantidad: cantidad, stock: carniceria[i].stock});
                    res.send(cesta);
                }
            }
            }
    );



app.listen(3000);