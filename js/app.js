//Selectores para las 3 partes del proyecto
const container = document.querySelector('.container');
const resultado = document.addEventListener('#resultado');
const formulario = document.addEventListener('#formulario');

//cargamos la ventana
window.addEventListener('load', () =>{
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e){
    e.prevent.default();

    //Validar

    //Consultar la API
}