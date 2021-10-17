//Selectores para las 3 partes del proyecto
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

//cargamos la ventana
window.addEventListener('load', () =>{
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        //Hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;
    }


    //Consultar la API
    consultarApi(ciudad,pais);
}
    function mostrarError(mensaje){
        const alerta = document.querySelector('.bg-red-100');

        if(!alerta){
            //Crear alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400' , 'text-red-700' , 'px-4' , 'py-3' , 'rounded' , 'max-w-md' ,
        'mx-auto' , 'mt-6' , 'text-center');

        //Scripting
        alerta.innerHTML = `
            <strong class = "font-bold">Error!</strong>
            <span class = "block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        //Eliminar la alerta
        setTimeout( () =>{
            alerta.remove();
        },5000);

        }
    }


function consultarApi(ciudad,pais){

    const appId = '819fbd7b3c607ede40e4e4657a98219e';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}
    &appid=${appId}`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML(); //Limpiar html previo
            console.log(datos);
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada');
            }

            //Imprime la respuesta en el HTML
            mostrarClima(datos);
        })

    }

function mostrarClima(datos){
    const { main: {temp, temp_max, temp_min}} = datos;
    
    const centigrado = kelvinACentigrado(temp);
    
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrado} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const resultadoDiv = document.createElement('div');
    resultado.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(actual);

    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrado = (grados)=> parseInt(grados - 275.15);


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}