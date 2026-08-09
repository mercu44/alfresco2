import {cargarReservasDia} from "./funciones.js";


const token = localStorage.getItem("token");


const estadoFormulario = document.getElementById("estadoForm");
const estadoSelect = document.getElementById("estadoSelect");
const filtroFormulario = document.getElementById("filtroForm");
const filtroSelect = document.getElementById("filtroSelect")
let estado = "todas";
let filtro = "orr";

const diaInput = document.getElementById("diaInput");
const hoy = new Date();
const fechaHoy = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
console.log(fechaHoy);
diaInput.value = fechaHoy; 

cargarReservasDia(fechaHoy, filtro, estado);

filtroFormulario.addEventListener("change", ()=>{
    estado = estadoSelect.value;
    filtro = filtroSelect.value;
    cargarReservasDia(diaInput.value, filtro,estado);
})


estadoFormulario.addEventListener("change", ()=>{
    estado = estadoSelect.value;
    filtro = filtroSelect.value;
        cargarReservasDia(diaInput.value, filtro,estado);

})


diaInput.addEventListener("change", ()=>{
    cargarReservasDia(diaInput.value, filtro,estado);
})



