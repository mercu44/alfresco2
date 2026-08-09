import {cargarReservas} from "./funciones.js";


const token = localStorage.getItem("token");



/* 
document.addEventListener("DOMContentLoaded", () => {
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    cargarReservas("pendiente");

    document.getElementById("cerrarSesion").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
});
*/
let estadoS = "pendiente";
const estadoFormulario = document.getElementById("estadoForm");
const estadoSelect = document.getElementById("estadoSelect");
let filtro = "ohr";
const filtroFormulario = document.getElementById("filtroForm");
const filtroSelect = document.getElementById("filtroSelect")


cargarReservas("pendiente", "ohr");

filtroFormulario.addEventListener("change", ()=>{
    estadoS = estadoSelect.value;
    filtro = filtroSelect.value;
    cargarReservas(estadoS, filtro);
})


estadoFormulario.addEventListener("change", ()=>{
    estadoS = estadoSelect.value;
    filtro = filtroSelect.value;
    cargarReservas(estadoS,filtro);
})


