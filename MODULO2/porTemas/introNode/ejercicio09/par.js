

function esPar(num1) {
    let resto=parseInt(num1%2);
    if (resto=0) {
        return true;
    }
    else {
        return false;
    }
}

module.exports=esPar;