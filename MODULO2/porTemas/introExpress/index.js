const express=require('express');
const servidor=express();
servidor.listen(3000);
servidor.get();
servidor.get('/', function(request, response){
                    response.send('Hola Mundo');

});