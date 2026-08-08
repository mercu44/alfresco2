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

const filtroFormulario = document.getElementById("filtroForm");
let estadoS = "pendiente";
let filtro = "ohr";
cargarReservas("pendiente", "ohr");

const filtroSelect = document.getElementById("filtroSelect")
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

async function modificarReserva(id, idCliente, idMesa, fecha, horaInicio, horaFin, estado, tipo, personas){
    try{
        const resultado = await fetch((`${API}/reservas/modificarReserva`),{
            method: "PUT",
            headers:{
                Authorization : `Bearer ${token}`,
                "Content-Type" : "application/json"
            }
            ,
            body : JSON.stringify({id,idCliente,idMesa,fecha, horaInicio, horaFin, estado, tipo, personas})
        })
        if(!resultado.ok){
            throw new Error();
        }
        const datos = await resultado.json();
    }catch(error){
        console.error(error);
    }
}
async function cambiarEstadoReserva(id,estado){
    try{
        const resultado = await fetch((`${API}/reservas/cambiarEstadoReserva`),{
            method: "PUT",
            headers:{
                Authorization : `Bearer ${token}`,
                "Content-Type": "application/json"
            }
            ,
            body: JSON.stringify({id,estado})
        });
        console.log("status:",resultado.status)
        if(!resultado.ok){
            throw new Error();
        }
        const datos = await resultado.json();
        console.log("cambiados :" +datos);

    }catch(error){
        console.error(error);
    }

}
function mostrarPanelCliente(cliente){
    const infoCliente = document.getElementById("panel");
    infoCliente.innerHTML = ` 
        <h2>Editar Cliente</h2>
        <div class="editarContenedor">
            <p>Id: ${cliente.id}</p>
            <p>telefono:${cliente.prefijo} ${cliente.telefono}</p>
            <p>correo: ${cliente.correo}</p>
            <p>nombre: ${cliente.nombre}</p>
            <p>nacionalidad: ${cliente.nacionalidad}</p>
            <p>puntuacion: ${cliente.score}</p>
            <p>comentariosMios: ${cliente.comentarios}</p>
            <p>numero cancelaciones</p>
            <p>numero no-show</p>
            <p>numero reservas</p>
            <p>ultima visita</p>
        </div>
    `
}
function mostrarPanelEditarReserva(reserva,cliente){
    const editarReserva = document.getElementById("panel");
    //let fechaFormateada = new Date(reserva.fecha).toLocaleDateString("es-ES");

    editarReserva.innerHTML = `
        <h2>Editar Reserva</h2>
            <div class="editarContenedor" >
                <form class="formEditar">
                    <div class="editarItem">
                        <label>id</label>
                        <input type="text"
                        id="idReserva"
                        readonly>
                    </div>
                    <div class="editarItem">
                        <label>Cliente Id</label>
                        <input type="text"
                        id="editarIdClienteReserva"
                         >
                    </div>
                    <div class="editarItem">
                        <label>Nombre Cliente</label>
                        <input type="text" 
                        id="editarNombreClienteReserva"

                        readonly>
                    </div>
                    <div class="editarItem">
                        <label>Mesa</label>
                        <input type="text" 
                        id="editarMesaReserva"
                        >
                    </div>
                    <div class="editarItem">
                        <label>Fecha</label>
                        <input type="date"
                        id="editarFechaReserva"
                        >   
                    </div>
                    <div class="editarItem">
                        <label>hora inicio</label>
                        <input type="text" 
                        id="editarHoraInicioReserva"
                        >
                    </div>
                    <div class="editarItem">
                        <label>hora fin</label>
                        <input type="text" 
                        id="editarHoraFinReserva"
                        >  
                    </div>
                    <div class="editarItem">
                        <label>Fecha Creacion</label>
                        <input type="text"

                         id="fechaCreacionReserva" 
                         readonly
                         >
                    </div>
                    <div class="editarItem">
                        <label>Estado</label>
                        <select id="editarEstadoReservaSelect">
                            <option value="pendiente">pendiente</option>
                            <option value="denegada">denegada</option>
                            <option value="lista-espera">lista espera</option>
                            <option value="hecha">hecha</option>
                            <option value="confirmada">confirmada</option>
                            <option value="cancelada">cancelada</option>
                            <option value="no-show">no-show</option>
                            <option value="pasada">pasada</option>
                            <option value="eliminada">eliminada</option>
                        </select>
                        
                    </div>
                    <div class="editarItem">
                        <label>token</label>
                        <input type="text"

                        id="tokenReserva" 
                        readonly>
                        
                    </div>
                    <div class="editarItem">
                       <label>tipo Reserva</label>
                        <select id="editarTipoReservaSelect">
                            <option value="web">web</option>
                            <option value="whatsapp">whatsapp</option>
                            <option value="llamada">llamada</option>
                        </select>
                    </div>
                    <div class="editarItem">
                            <label>Personas</label>
                            <input type="text"
                            id="editarPersonasReserva"
                            >
                    </div>
 
                    <button type ="button" id="btnEditarReserva">Editar</button>
                </form>
            </div>
    `;
    const idReserva = document.getElementById("idReserva");
    const editarIdClienteReserva = document.getElementById("editarIdClienteReserva");
    const editarNombreClienteReserva = document.getElementById("editarNombreClienteReserva");
    const editarMesaReserva = document.getElementById("editarMesaReserva");
    const editarFechaReserva = document.getElementById("editarFechaReserva");
    const editarHoraInicioReserva = document.getElementById("editarHoraInicioReserva");
    const editarHoraFinReserva = document.getElementById("editarHoraFinReserva");
    const editarEstadoReservaSelect = document.getElementById("editarEstadoReservaSelect");
    const editarTipoReservaSelect = document.getElementById("editarTipoReservaSelect");
    const editarPersonasReserva = document.getElementById("editarPersonasReserva");
    const tokenReserva = document.getElementById("tokenReserva");
    const fechaCreacionReserva = document.getElementById("fechaCreacionReserva")
    const botonReserva = document.getElementById("btnEditarReserva");
    

    idReserva.value = reserva.id;
    editarIdClienteReserva.value = reserva.cliente_id;
    editarNombreClienteReserva.value = cliente.nombre;
    editarMesaReserva.value = reserva.mesa_id ?? "";
    editarFechaReserva.value = reserva.fecha.slice(0, 10);
    editarHoraInicioReserva.value = reserva.hora_inicio;
    editarHoraFinReserva.value = reserva.hora_fin ?? "";
    fechaCreacionReserva.value = reserva.fecha_creacion;
    editarEstadoReservaSelect.value = reserva.estado;
    tokenReserva.value = reserva.token;
    editarTipoReservaSelect.value = reserva.tipo_reserva;
    editarPersonasReserva.value = reserva.personas;


    botonReserva.addEventListener("click", ()=>{
        modificarReserva(
            idReserva.value,
            editarIdClienteReserva.value,
            editarMesaReserva.value,
            editarFechaReserva.value,
            editarHoraInicioReserva.value || null,
            editarHoraFinReserva.value || null,
            editarEstadoReservaSelect.value,
            editarTipoReservaSelect.value,
            editarPersonasReserva.value
        )
    })
}




export function crearTarjeta(reserva, cliente) {
    const fecha = new Date(reserva.fecha);

    const fechaFormateada = fecha.toLocaleDateString("es-ES");

    const hora = reserva.hora_inicio.slice(0, 5);

    let estadoReserva = reserva.estado;
    console.log(estadoReserva);

    if (reserva.lista_espera) {
        estado = "espera";
    }

    const tarjeta = document.createElement("div");
    tarjeta.className = "item-wrapper";
    tarjeta.id = reserva.id;
    tarjeta.innerHTML = `
        <article class="item">
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
        </article>
        <div class="submenu">
            <button class="btnSubmenu greyBack btnClienteInfoPanel">Cliente info</button>
            <button class="btnSubmenu orangeBack btnEditarReservaPanel">Editar Reserva</button>
            <button class="btnSubmenu greenBack btnAceptarReserva">Aceptar</button>
            <button class="btnSubmenu redBack btnRechazarReserva">Rechazar</button>
            <button class="btnSubmenu blueBack btnArchivarReserva">Archivar</button>
        </div>
        
    `;
    const item = tarjeta.querySelector(".item");
    const clienteInfoPanel = tarjeta.querySelector(".btnClienteInfoPanel");
    const editarReservaPanel = tarjeta.querySelector(".btnEditarReservaPanel");
    const aceptarReserva = tarjeta.querySelector(".btnAceptarReserva");
    const rechazarReserva = tarjeta.querySelector(".btnRechazarReserva");
    const archivarReserva = tarjeta.querySelector(".btnArchivarReserva");

    aceptarReserva.addEventListener("click", async ()=>{
        await cambiarEstadoReserva(reserva.id,"hecha");
        await cargarReservas(estadoS, filtro);

    })
    rechazarReserva.addEventListener("click", async ()=>{
        await cambiarEstadoReserva(reserva.id,"denegada")
        await cargarReservas(estadoS, filtro);

    })
    archivarReserva.addEventListener("click", async()=>{
        await cambiarEstadoReserva(reserva.id, "archivada");
        await cargarReservas(estadoS, filtro);
    })

    clienteInfoPanel.addEventListener("click", ()=>{
        mostrarPanelCliente(cliente);
    })
    editarReservaPanel.addEventListener("click",()=>{
        mostrarPanelEditarReserva(reserva,cliente);
    })

    return tarjeta;
}

