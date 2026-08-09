import {cargarReservasDia} from "./funciones.js";


const token = localStorage.getItem("token");


//const estadoFormulario = document.getElementById("estadoForm");
//const estadoSelect = document.getElementById("estadoSelect");
//let estadoS = "pendiente";
//let filtro = "ohr";

const diaInput = document.getElementById("diaInput");
const hoy = new Date();
const fechaHoy = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
console.log(fechaHoy);
cargarReservasDia(fechaHoy,"","");
diaInput.value = fechaHoy; 

diaInput.addEventListener("change", ()=>{
    cargarReservasDia(diaInput.value, "","");
})



