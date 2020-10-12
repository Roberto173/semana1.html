



fetch(`https://randomuser.me/api/`).then (function cogerRespuesta (response){
    return response.json();
}).then (function cogerDatos (datos){
    let random = `<div>
                <img src=${datos.results[0].picture.medium} alt="" />
                <h1>${datos.results[0].name.title} ${datos.results[0].name.first} ${datos.results[0].name.last}</h1>
                <p>${datos.results[0].email}<p>
              </div>`;
    
    document.getElementById("random").innerHTML = random;
})