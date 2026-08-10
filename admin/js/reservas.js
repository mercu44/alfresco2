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
let estado = "pendiente";
const estadoFormulario = document.getElementById("estadoForm");
const estadoSelect = document.getElementById("estadoSelect");
let filtro = "ohr";
const filtroFormulario = document.getElementById("filtroForm");
const filtroSelect = document.getElementById("filtroSelect")


cargarReservas("ohr", "pendiente");

filtroFormulario.addEventListener("change", ()=>{
    estado = estadoSelect.value;
    filtro = filtroSelect.value;
    cargarReservas(filtro, estado );
})


estadoFormulario.addEventListener("change", ()=>{
    estado = estadoSelect.value;
    filtro = filtroSelect.value;
    cargarReservas(filtro, estado);
})


