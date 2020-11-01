

//function array(num1) {
//    let num=1+num1;
//    let miArray=[];
//    for (let i=num; i<num+10; i++) {
//        let miArray=miArray.push(i);
//    }
//    return miArray;
//}

//module.exports=array;

//function random() {
//    return Math.floor((Math.random() * (max - min + 1)) + min);
//}







function numerosConsecutivos(numero) {
    let array = [];
    for (let i=1; i<11; i++) {
        array.push(numero + i);
    }
    return array;
}
module.exports=numerosConsecutivos;