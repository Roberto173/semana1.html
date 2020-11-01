const express=require("express");
const app=express();

let alumnos=["Ainara", "Anastasia", "Begoña", "Camile", "Daniel", "David", "Diego", "Elena", "Gontzal", "Leticia", "Maialen", "Manu", "Miriam", "Rafa", "Roberto", "Yoanna"];
let profesores=["Ander", "Elisa", "Ibai", "Marta"];

app.get("/profesores/:agregar", function(req,res){
    let nombreProfesor = req.params.agregar;
    for (let i=0; i<profesores.length; i++) {
        if (nombreProfesor === profesores[i]) {
            alumnos.push(nombreProfesor);
            res.send(`El nombre ${nombreProfesor} se ha añadido a la lista de alumnos`);
        }
    }
    res.send(`El nombre ${nombreProfesor} no es de ningún profesor.`);
})


app.get("/alumnos", function(req,res){
    nombresAlumnos="";
    for (let i=0; i<alumnos.length; i++) {
        nombresAlumnos += `<h3> ${alumnos[i]} </h3>`;
    }
        res.send(`Los nombres de los alumnos son: ${nombresAlumnos}`);
});

app.get("/profesores", function(req,res){
    nombresProfesores="";
    for (let i=0; i<profesores.length; i++) {
        nombresProfesores += `<h3> ${profesores[i]} </h3>`;
    }
        res.send(`Los nombres de los profesores son: ${nombresProfesores}`);
});


app.listen(3000);