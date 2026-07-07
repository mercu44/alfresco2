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
// HEADER SCROLL
// ======================================


window.addEventListener("scroll", () => {

    header.classList.toggle("scrolled", window.scrollY > 50);

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


const input = document.getElementById("telefono");

const iti = window.intlTelInput(input, {
    initialCountry: "es",
    preferredCountries: ["es", "fr", "pt", "it"],
    separateDialCode: true
});


console.log(iti.getSelectedCountryData());

const boton = document.getElementById("btnReserva");

emailjs.init({
    publicKey: "bmsJX810X_j6VrLv9"
});
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
        mensaje: document.getElementById("mensaje").value

    };

    try{

        // Restaurante


        boton.disabled = true;
        boton.textContent = "Enviando..."; 
        boton.style.background = "#5b8f68"; 

        await emailjs.send(
            "service_ll3taad",
            "template_52h8lnh",
            datos
        );

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
