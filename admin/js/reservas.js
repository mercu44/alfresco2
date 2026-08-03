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

    cargarReservas("pendiente");

    document.getElementById("cerrarSesion").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
});
*/
/* 
<form id="filtroForm">
                    <select id="filtroReservas">
                        <option value="ohr">Orden hecha: mas recientes</option>
                        <option value="oha">Orden hecha: mas antiguas</option>

                        <option value="orr">Orden reserva: mas recientes</option>
                        <option value="ora">Orden reserva: mas antiguas</option>

                    </select>
*/
const filtroFormulario = document.getElementById("filtroForm");
const filtroSelect = document.getElementById("filtroSelect")
filtroFormulario.addEventListener("change", ()=>{
    estadoS = estadoSelect.value;
    filtro = filtroSelect.value;
    cargarReservas(estadoS, filtro);
})

let estadoS = "pendiente";
estadoFormulario.addEventListener("change", ()=>{
    estadoS = estadoSelect.value;
    filtro = filtroSelect.value;
    cargarReservas(estadoS,filtro);
})

async function cargarReservas(estado, orden) {
    try {

        const respuesta = await fetch(`${API}/reservas?estado=${estado}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener las reservas");
        }

        let reservas = await respuesta.json();
        console.log(reservas);

        if(orden==="orr"){
            reservas.sort((a,b) => 
            new Date(a.reserva.fecha) - new Date(b.reserva.fecha)
            );
        }
        else if(orden==="ora"){
            reservas.sort((a,b) => 
            new Date(b.reserva.fecha) - new Date(a.reserva.fecha)
            );
        }
        else if(orden==="ohr"){
            reservas.sort((a,b) =>
                new Date(b.reserva.fecha_creacion) - new Date(a.reserva.fecha_creacion)
             );
        }
        else if(orden==="oha"){
            reservas.sort((a,b) =>
                new Date(a.reserva.fecha_creacion) - new Date(b.reserva.fecha_creacion)
            );
        }

        
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
function crearClienteInfo(cliente){
    const infoCliente = document.getElementById("infoCliente");
    infoCliente.innerHTML = ` 
        <p>Id: ${cliente.id}</p>
        <p>telefono:+${cliente.prefijo} ${cliente.telefono}</p>
        <p>correo: ${cliente.correo}</p>
        <p>nombre: ${cliente.nombre}</p>
        <p>nacionalidad: ${cliente.nacionalidad}</p>
        <p>puntuacion: ${cliente.puntuacion}</p>
        <p>comentariosMios: ${cliente.comentarios}</p>
        <p>numero cancelaciones</p>
        <p>numero no-show</p>
        <p>numero reservas</p>
        <p>ultima visita</p>
    `



}
function crearTarjeta(reserva, cliente) {
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
    tarjeta.id = reserva.id;
    tarjeta.innerHTML = `
        <div class="estado ${estadoReserva}"></div>

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
        <div class="acciones">
            <button class="btnAceptar">
                <i class="fa-solid fa-check"></i>
            </button>

            <button class="btnDenegar">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `;
    tarjeta.addEventListener("click", ()=>{
        crearClienteInfo(cliente);
    })

    return tarjeta;
}