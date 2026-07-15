const API = window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "/api";
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/admin/login.html";
}

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
};

// ======================================
// INICIO
// ======================================

document.addEventListener("DOMContentLoaded", async () => {

    await cargarCarta();
    await cargarDias();
    await cargarHoras();

});

// ======================================
// CERRAR SESIÓN
// ======================================

document
    .getElementById("cerrarSesion")
    .addEventListener("click", cerrarSesion);

function cerrarSesion() {

    localStorage.removeItem("token");

    window.location.href = "/login.html";

}

// ======================================
// FECHAS
// ======================================

document
    .getElementById("formFecha")
    .addEventListener("submit", añadirFecha);

async function añadirFecha(e) {

    e.preventDefault();

    const fecha = document.getElementById("fechaCierre").value;

    const respuesta = await fetch(
        `${API}/addFecha`,
        {
            method: "POST",
            headers,
            body: JSON.stringify({ fecha })
        }
    );

    if (!respuesta.ok) {
        alert("Error al añadir la fecha");
        return;
    }

    document.getElementById("formFecha").reset();

    cargarDias();

}

async function cargarDias() {

    const contenedor = document.getElementById("listaDias");

    contenedor.innerHTML = "";

    const respuesta = await fetch(
        `${API}/disponibilidad/dias`
    );

    const dias = await respuesta.json();

    dias.forEach(fecha => {

        const div = document.createElement("div");

        div.classList.add("item");

        div.innerHTML = `
            <span>${fecha}</span>

            <button class="eliminar-dia">
                Eliminar
            </button>
        `;

        div
            .querySelector(".eliminar-dia")
            .addEventListener(
                "click",
                () => eliminarDia(fecha)
            );

        contenedor.appendChild(div);

    });

}

async function eliminarDia(fecha) {

    const respuesta = await fetch(
        `${API}/eliminarFecha`,
        {
            method: "DELETE",
            headers,
            body: JSON.stringify({ fecha })
        }
    );

    if (!respuesta.ok) {
        alert("Error eliminando fecha");
        return;
    }

    cargarDias();

}

// ======================================
// HORAS
// ======================================

document
    .getElementById("formHora")
    .addEventListener("submit", añadirHora);

async function añadirHora(e) {

    e.preventDefault();

    const fecha = document.getElementById("fechaHora").value;

    const hora = document.getElementById("horaCierre").value;

    const respuesta = await fetch(
        `${API}/addHora`,
        {
            method: "POST",
            headers,
            body: JSON.stringify({
                fecha,
                hora
            })
        }
    );

    if (!respuesta.ok) {
        alert("Error al añadir la hora");
        return;
    }

    document.getElementById("formHora").reset();

    cargarHoras();

}

async function cargarHoras() {

    const contenedor = document.getElementById("listaHoras");

    contenedor.innerHTML = "";

    const respuesta = await fetch(
        `${API}/disponibilidad/todasHoras`
    );

    const horas = await respuesta.json();

    horas.forEach(item => {

        const div = document.createElement("div");

        div.classList.add("item");

        div.innerHTML = `
            <span>${item.fecha} · ${item.hora}</span>

            <button class="eliminar-hora">
                Eliminar
            </button>
        `;

        div.querySelector(".eliminar-hora").addEventListener("click",() => eliminarHora(
                    item.fecha,
                    item.hora
                )
            );

        contenedor.appendChild(div);

    });

}

async function eliminarHora(fecha, hora) {
    // NO FUNCINONA PORQUE SE GUARDAN TODAS LAS FECHAS UN DIA ANTERIOR
    console.log(fecha);
    console.log(hora);
    const respuesta = await fetch(
        `${API}/eliminarHora`,
        {
            method: "DELETE",
            headers,
            body: JSON.stringify({
                fecha,
                hora
            })
        }
    );

    if (!respuesta.ok) {
        alert("Error eliminando hora");
        return;
    }

    cargarHoras();

}

// ======================================
// CARTA
// ======================================

let idiomaCarta ="es";

const formIdioma = document.getElementById("formIdioma");
const selectIdioma = document.getElementById("idioma");
formIdioma.addEventListener("change", ()=>{
    idiomaCarta = selectIdioma.value;
    cargarCarta();
})

document
    .getElementById("formPlato")
    .addEventListener("submit", crearPlato);

async function crearPlato(e) {

    e.preventDefault();

    const datos = {

        nombre: document.getElementById("nombre").value,

        descripcion: document.getElementById("descripcion").value,

        precio: document.getElementById("precio").value,

        categoria: document.getElementById("categoria").value,

        idioma:idiomaCarta
    };

    const respuesta = await fetch(
        `${API}/carta`,
        {
            method: "POST",
            headers,
            body: JSON.stringify(datos)
        }
    );

    if (!respuesta.ok) {
        alert("Error creando plato");
        return;
    }

    document.getElementById("formPlato").reset();

    cargarCarta();

}

async function cargarCarta() {

    const contenedor = document.getElementById("listaPlatos");

    contenedor.innerHTML = "";

    const respuesta = await fetch(
        `${API}/carta?idioma=${idiomaCarta}`
    );

    let platos = await respuesta.json();

    platos.sort((a, b) => a.orden - b.orden);

    let categoriaActual = "";

    platos.forEach(plato => {

        if (plato.categoria !== categoriaActual) {

            categoriaActual = plato.categoria;

            const titulo = document.createElement("h2");

            titulo.textContent = categoriaActual;

            titulo.classList.add("categoria");

            contenedor.appendChild(titulo);

        }

        const div = document.createElement("div");

        div.classList.add("item");

        div.innerHTML = `

            <div class="info">

                <h3>${plato.nombre}</h3>

                <p>${plato.descripcion}</p>

                <span>${plato.precio} €</span>

                <small>
                    ${plato.idioma.toUpperCase()}
                </small>

            </div>

            <div class="acciones">

                <button class="editar-plato">

                    Editar

                </button>

                <button class="eliminar-plato">

                    Eliminar

                </button>

            </div>

        `;

        div
            .querySelector(".editar-plato")
            .addEventListener(
                "click",
                () => editarPlato(
                    plato.nombre,
                )
            );

        div
            .querySelector(".eliminar-plato")
            .addEventListener(
                "click",
                () => eliminarPlato(
                    plato.nombre,
                )
            );

        contenedor.appendChild(div);

    });

}

async function eliminarPlato(nombre) {

    const respuesta = await fetch(
        `${API}/carta/${nombre}/${idiomaCarta}`,
        {
            method: "DELETE",
            headers
        }
    );

    if (!respuesta.ok) {
        alert("Error eliminando plato");
        return;
    }

    cargarCarta();

}

async function editarPlato(nombre) {

    const nuevoNombre = prompt("Nuevo nombre:");

    const nuevaDescripcion = prompt("Nueva descripción:");

    const nuevoPrecio = prompt("Nuevo precio:");
    const nuevoOrden = prompt("Nuevo orden:");


    const respuesta = await fetch(
        `${API}/carta/${nombre}/${idiomaCarta}`,
        {
            method: "PUT",

            headers,

            body: JSON.stringify({

                nombre: nuevoNombre,

                descripcion: nuevaDescripcion,

                precio: nuevoPrecio,

                orden: nuevoOrden

            })
        }
    );

    if (!respuesta.ok) {
        alert("Error editando plato");
        return;
    }

    cargarCarta();

}

// ======================================
// IMPORTAR CARTA
// ======================================

const botonImportar = document.getElementById("importarCarta");
const inputArchivo = document.getElementById("archivoCarta");

botonImportar.addEventListener("click", () => {
    console.log("boton clicao")
    inputArchivo.click();

});

inputArchivo.addEventListener("change", importarCarta);

async function importarCarta() {

    const archivo = inputArchivo.files[0];

    if (!archivo) {

        alert("Selecciona un archivo");

        return;

    }

    const texto = await archivo.text();

    const platos = JSON.parse(texto);

    const respuesta = await fetch(
        `${API}/carta/importar`,
        {
            method: "POST",
            headers,
            body: JSON.stringify(platos)
        }
    );

    if (!respuesta.ok) {

        alert("Error importando la carta");

        return;

    }

    cargarCarta();


}
// ======================================
// BORRAR CARTA
// ======================================
document.getElementById("borrarCarta").addEventListener("click", borrarCarta);

async function borrarCarta(){
    const respuesta = await fetch(
        `${API}/carta/${idiomaCarta}`,
        {
            method: "DELETE",
            headers
        }
    );
    if (!respuesta.ok) {
        alert("Error eliminando carta");
        return;
    }

    cargarCarta();


}
cargarCarta();