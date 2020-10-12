



//let fecha = window.prompt(`Introduzca su fecha de nacimiento (dd-mm-año)`);

//console.log(fecha);
//let longitud = fecha.length;
//console.log(longitud);

//let dia = fecha.substring(0,2);
//console.log(dia);
//let mes = fecha.substring(3,5);
//console.log(mes);
//let anyo = fecha.substring(6,10);
//console.log(anyo);

//for (let i = 0; i = 1; i++){

//    let sumadia += dia.split(i)

//


//declaramos las variables dia, mes anyo, sumaFecha, total y total1 sin asignarles ningún valor
//declaramos las variables x e y y las igualamos a 0
let dia;
let mes;
let anyo;
let sumaFecha;
let total;
let total1;
let x = 0;
let y = 0;

//le preguntamos al usuario su dia, mes y año de nacimiento
dia = parseInt(window.prompt("Escribe tu día de nacimiento"));
mes = parseInt(window.prompt("Escribe tu mes de nacimiento"));
anyo = parseInt(window.prompt("Escribe tu año de nacimiento"));


//sumamos dia + mes + anyo y al igualarlo a sumaFecha lo pasamos a string
sumaFecha = (dia + mes + anyo).toString();


//en el bucle do siempre se entra al menos una vez. Y en este se seguirá entrando
//mientras la condición del while que está abajo se cumpla
//es decir mientras y no sea igual a 1
do {
    //igualamos x a la largura del string sumaFecha
  x = sumaFecha.length;
  //igualamos total a 0
  total = 0;
  //entramos al while mientras x sea mayor que 0. Más arriba hemos igualado 
  //x a la largura del string sumaFecha
  while (x > 0) {
      //cogemos la subcadena o substring de sumaFecha que va desde la posición x -1 hasta x
      //y lo parseamos para convertirlo en un número entero
    total1 = parseInt(sumaFecha.substring(x - 1, x));
    //igualamos total total parseado.
    total = parseInt(total);

    //total pasa a ser = a total + total1
    total = total + total1;
    //le quitamos 1 a x. Si x es 0 saldrá del bucle, si no seguirá en él.
    x--;
  }
  //sumaFecha pasa a ser = que total pasado a string
  sumaFecha = total.toString();
  //a y le damos el valor de sumaFecha.lenght (la largura del string que contiene sumaFecha)
  y = sumaFecha.length;
  //si la largura del string que contiene sumaFecha es 1 y sería 1 y saldríamos del bucle do. Si no lo volveríamos a repetir hasta que y sea 1
} while (y !== 1);

//sacamos en pantalla el número de la suerte
console.log(`Tu número de la suerte es ${total}`);

