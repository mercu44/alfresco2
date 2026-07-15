
const idioma = localStorage.getItem("idioma") || "es";
const API = "/api";

console.log("idioma: "+idioma);

// HEADER

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    header.classList.toggle("scrolled", window.scrollY > 80);

});

// ANIMACIONES

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".fade-up").forEach(el => {

    observer.observe(el);

});

const languageBtn = document.querySelector(".language-btn");
const languageMenu = document.querySelector(".language-menu");

languageBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    languageMenu.classList.toggle("active");

});

document.addEventListener("click", () => {

    languageMenu.classList.remove("active");

});


// ======================================
// MENÚ HAMBURGUESA
// ======================================

const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");

    menuPanel.classList.toggle("active");

    document.body.classList.toggle("menu-open");

});


// ======================================
// CERRAR AL PULSAR UN ENLACE
// ======================================

document.querySelectorAll(".menu-panel a").forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        menuPanel.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

});


// ======================================
// CERRAR CON ESC
// ======================================

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        menuToggle.classList.remove("active");

        menuPanel.classList.remove("active");

        document.body.classList.remove("menu-open");

    }

});

// ======================================
// RESERVAS
// ======================================


const input = document.getElementById("telefono");

const iti = window.intlTelInput(input, {
    initialCountry: "es",
    preferredCountries: ["es", "fr", "pt", "it"],
    separateDialCode: true
});

const boton = document.getElementById("btnReserva");

const formulario = document.getElementById("reservationForm");

formulario.addEventListener("submit", enviarReserva);

async function enviarReserva(e){

    e.preventDefault();

    const datos = {

        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: iti.getSelectedCountryData().dialCodePlus + " " + document.getElementById("telefono").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        personas: document.getElementById("personas").value,
        mensaje: document.getElementById("mensaje").value,
        idioma: idioma

    };

    try{
        // Restaurante
        boton.disabled = true;
        boton.textContent = "Enviando..."; 
        boton.style.background = "#5b8f68"; 

        const respuesta = await fetch(
            `${API}/gestionarCorreo`
            {
                method :"POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(datos)
            }
        );

        if (!respuesta.ok) {
        throw new Error("Error enviando la reserva");
         }


        // Cliente
        boton.textContent = "✓ Solicitud enviada";
        boton.style.background = "#5b8f68";

        formulario.reset();

    }
    catch(error){

        console.error(error);

        boton.disabled = false;
        boton.textContent = "Error al enviar";
        boton.style.background = "#b23b3b";

    }

}
const horasBase = ["19:15","19:30","19:45","20:00","20:15","20:30","20:45","21:00","21:15","21:30","21:45","22:00","22:15","22:30"];
inicializarCalendario();
async function inicializarCalendario(){
    const respuesta =  await fetch(
        `${API}/disponibilidad/dias`
    );
    const datos = await respuesta.json();
    console.log(datos);

    flatpickr("#fecha", {
    locale: "es",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d/m/Y",
    locale:{firstDayOfWeek:1},
    minDate: "today",
    disable: [
        ...datos,
        date => date.getDay() === 1
    ]
    
});
}
const hora = document.getElementById("hora");
const fecha = document.getElementById("fecha")
async function obtenerHoras(fecha){
    const respuesta =  await fetch(
        `${API}/disponibilidad/horas?fecha=${fecha}`
    );
    const horarioNoDisponibles = await respuesta.json();
    let horasDisponibles =  horasBase.filter( hora => !horarioNoDisponibles.includes(hora));
    actualizarSelectHoras(horasDisponibles);
    
}
function actualizarSelectHoras(listaHoras){
    hora.innerHTML = '<option values="">Seleccione una hora</option>'

    listaHoras.forEach(h=>{
        const option = document.createElement("option");
        option.value = h;
        option.textContent = h;
        hora.appendChild(option);
    })
}
fecha.addEventListener("change", (evento)=>{
    obtenerHoras(evento.target.value);

})
function iniciarHoras(){
    if(fecha.value){
        obtenerHoras(fecha.value);
    }
}
iniciarHoras();


function cambiarIdioma(idioma){
    localStorage.setItem(
        "idioma",
        idioma
    );
}



/*
const cookie = document.getElementById("cookies");
if(localStorage.getItem("cookieAceptadas") ==="true"){
    cookie.style.display="none";
}
document.getElementById("cerrar").addEventListener("click", function(){
    cookie.style.display ="none";
})
document.getElementById("aceptar").addEventListener("click", function(){
    cookie.style.display="none";
    localStorage.setItem("cookiesAceptadas", "true");
})
    */