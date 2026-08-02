const API = window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "/api";

const token = localStorage.getItem("token");


const listaReservas = document.getElementById("listaReservas");
const numReservas = document.getElementById("numReservas");
const estadoFormulario = document.getElementById("estadoForm");
const estadoSelect = document.getElementById("estadoSelect");
/* 
document.addEventListener("DOMContentLoaded", () => {
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    cargarReservas();

    document.getElementById("cerrarSesion").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
});
*/
console.log("reservas.js");
let estadoS = "pendiente";
estadoFormulario.addEventListener("change", ()=>{
    estadoS = estadoSelect.value;
    console.log("cambio a: "+estadoS );
    cargarReservas(estadoS);
})

async function cargarReservas(estado) {
    console.log("cargarReservas");
    try {

        const respuesta = await fetch(`${API}/reservas?estado=${estado}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener las reservas");
        }

        const reservas = await respuesta.json();

        listaReservas.innerHTML = "";
        numReservas.innerHTML = reservas.length + " reservas";
        if (reservas.length === 0) {
            listaReservas.innerHTML = `
                <div class="card">
                    No hay reservas.
                </div>
            `;
            return;
        }
        console.log(estado);
        reservas.forEach(({ reserva, cliente }) => {
            listaReservas.appendChild(crearTarjeta(reserva, cliente,estado));
        });

    } catch (error) {
        console.error(error);

        listaReservas.innerHTML = `
            <div class="card">
                Error al cargar las reservas.
            </div>
        `;
    }
}


function crearTarjeta(reserva, cliente) {
    console.log("crearTarjeta");
    const fecha = new Date(reserva.fecha);

    const fechaFormateada = fecha.toLocaleDateString("es-ES");

    const hora = reserva.hora_inicio.slice(0, 5);

    let estadoReserva = reserva.estado;
    console.log(estadoReserva);

    if (reserva.lista_espera) {
        estado = "espera";
    }

    const tarjeta = document.createElement("article");
    tarjeta.className = "item";

    tarjeta.innerHTML = `
        <div class="${estadoReserva}"></div>

        <div class="item-contenido">

            <div class="item-cliente">
                <h3>${cliente.nombre}</h3>
                <span>${cliente.prefijo} ${cliente.telefono}</span>
                <span>${cliente.correo}</span>
            </div>

            <div class="item-info">

                <span>
                    <i class="fa-solid fa-users"></i>
                    ${reserva.personas}
                </span>

                <span>
                    <i class="fa-solid fa-calendar"></i>
                    ${fechaFormateada}
                </span>

                <span>
                    <i class="fa-solid fa-clock"></i>
                    ${hora}
                </span>

                <span class="badge">
                    ${reserva.tipo_reserva.toUpperCase()}
                </span>

            </div>

        </div>
    `;

    return tarjeta;
}