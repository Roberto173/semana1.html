const express=require("express");
const app=express();
app.use(express.static(`public`));




let animales =[
    {
        nombre: "Koko",
        edad: 4,
        tipo: "perro"
    },
    {
        nombre: "Pancho",
        edad: 1,
        tipo: "perro"
    },
    {
        nombre: "Don Gato",
        edad: 7,
        tipo: "gato"
    },
    {
        nombre: "Fiu",
        edad: 2,
        tipo: "gato"
    }
];

app.get("/", function (req,res){
    let listaAnimales ="";
    for (let i=0; i<animales.length; i++){
        listaAnimales += `<h3>Nombre: ${animales[i].nombre}</h3>
                            <h4>Edad: ${animales[i].edad}</h4>
                            <h4>Tipo: ${animales[i].tipo}</h4>
                            <form action="/adoptar">
                            <input type="hidden" value="${animales[i].nombre}" name="nombre"/>
                            <button type="submit">Adoptar</button>
                            </form>`;
    }
    res.send(`<h1>Lista de animales:</h1> ${listaAnimales}`);
})
    

//app.get("/sumar-animal", function (req,res){
//    let nombre = req.query.nombre;
//    let edad = req.query.edad;
//    let tipo = req.query.tipo;
//    animales.push({nombre: nombre, edad: edad, tipo: tipo});
//    res.send(`Se ha añadido el nuevo animal a la lista`);
//})

app.get("/sumar-animal", function(req,res){
    let nombre = req.query.nombre;
    let edad = req.query.edad;
    let tipo = req.query.tipo;
    let animal = {
        nombre: nombre,
        edad: edad,
        tipo: tipo
    };
    animales.push(animal);
    res.send(`Se ha añadido el nuevo animal a la lista`);
})

app.get("/dejar-animal", function(req, res){
    let formulario =`<form action="/sumar-animal">
        <input type="text" name="nombre" placeholder="Nombre">
        <input type="text" name="edad" placeholder="Edad">
        <input type="text" name="tipo" placeholder="Tipo">
        <button type="submit">Añadir animal</button>
    </form>`;
    res.send(formulario);
})

app.get("/adoptar", function(req,res){
    let nombre = req.query.nombre;
    for (let i=0; i<animales.length; i++) {
        if (nombre === animales[i].nombre) {
            animales.splice(i,1);
        }
    }
        res.send(animales);
})

app.listen(3000);