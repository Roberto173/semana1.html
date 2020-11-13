let suma;
let numero;
let sumatorio;


while (numero>0) {

    numero = window.prompt(`Introduzca un número:`);
    suma = numero;
    sumatorio = suma+numero;

    console.log(sumatorio);
}

if (numero<0) {

    console.log(`No se admiten números negativos`);

}

else if (numero=0) {

    console.log(`La suma de los números introducidos es:  ${sumatorio}`);

}