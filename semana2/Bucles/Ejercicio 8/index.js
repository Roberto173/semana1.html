let pares = 0;
let impares = 0;
let entrada = "";

entrada = window.prompt(`Por favor, escriba: 
    P si quiere ver los números pares entre 1 y 100
    I si desea ver los números impares entre 1 y 100`);

while (entrada !== "P"  && entrada !== "I") {

    window.alert (`El valor introducido no es corecto`);
    entrada = window.prompt(`Por favor, escriba: 
    P si quiere ver los números pares entre 1 y 100
    I si desea ver los números impares entre 1 y 100`);
    
}


if (entrada === "P") {

    for (let i = 2; i <= 100; i = i+2) {

        pares = i;
        console.log (pares);

    }

}

else if (entrada === "I") {

    for (let i = 1; i <= 100; i = i+2) {

        impares = i;
        console.log (impares);

    }
}

