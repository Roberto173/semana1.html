let impar = 0;
let par = 0;
let cuadrado = 0;
let cubo = 0;
let resto = 0;


for (let i=1; i <13; i++) {

    resto = parseInt (i % 2);

    if (resto !== 0 ) {

        cuadrado = i * i;
        console.log(`${i} , su cuadrado es ${cuadrado}`);

    }

    else {

        cubo = i * i * i;
        console.log(`${i}, su cubo es  ${cubo}`);

    }

}