
const API = window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "/api";

const listaReservas = document.getElementById("listaReservas");
const numReservas = document.getElementById("numReservas");
const token = localStorage.getItem("token");


export async function cargarReservas(orden, estado) {
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
            listaReservas.appendChild(crearTarjeta(reserva, cliente, false, estado, orden));
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

export async function cargarReservasDia(fecha, orden, estado) {
    try {
        const respuesta = await fetch(`${API}/reservas/${fecha}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener las reservas");
        }

        let reservas = await respuesta.json();
        console.log(`Reservas del dia: ${fecha}`)
        console.log(reservas);
         if (estado !== "todas"){
            reservas = reservas.filter(({reserva}) => reserva.estado ===estado);
        }
        
        if(orden==="orr"){
            reservas.sort((a,b) => 
            a.reserva.hora_inicio.localeCompare(b.reserva.hora_inicio)
            );
        }
        else if(orden==="ora"){
            reservas.sort((a,b) => 
            b.reserva.hora_inicio.localeCompare(a.reserva.hora_inicio)
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
            listaReservas.appendChild(crearTarjeta(reserva, cliente,true, estado,orden));
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
        else return true;
    }catch(error){
        console.error(error);
            return false;

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

async function obtenerEstadisticasCliente(id){
    try{
        const resultado = await fetch((`${API}/clientes/${id}`),{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!resultado.ok) {
            throw new Error("No se pudieron obtener las estadísticas");
        }
        const datos = await resultado.json();
        return datos;
    }catch(error){
        console.error(error);
        return null;
    }

}

async function modificarCliente(id, telefonoEntero, correo, nombre, nacionalidad, score, comentarios){
    try{
        const telefonoSeparado = telefonoEntero.split(' ');
        const prefijo = telefonoSeparado[0];
        const telefono = telefonoSeparado[1];
        console.log(`telefono entero: ${telefonoEntero} , prefijo: ${prefijo}, telefono: ${telefono}`)
        const resultado = await fetch((`${API}/clientes/${id}`),{
            method : "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({id,telefono,prefijo,correo, nombre, nacionalidad, score, comentarios})
        });
        if(!resultado.ok){
            throw new Error();
        }
        else return true;

    }catch(error){
        console.error(error);
        return false;
    }
}
async function mostrarPanelCliente(cliente) {
    const infoCliente = document.getElementById("panel");

    infoCliente.innerHTML = `
        <h2>Editar Cliente</h2>

        <div class="editarContenedor">
            <form class="formEditar">

                <div class="editarItem">
                    <label>ID</label>
                    <input
                        type="text"
                        id="idCliente"
                        readonly
                    >
                </div>

                <div class="editarItem">
                    <label>Correo</label>
                    <input
                        type="text"
                        id="editarCorreoCliente"
                    >
                </div>

                <div class="editarItem">
                    <label>Teléfono</label>
                    <input
                        type="text"
                        id="editarTelefonoCliente"
                    >
                </div>

                <div class="editarItem">
                    <label>Nombre Cliente</label>
                    <input
                        type="text"
                        id="editarNombreClienteCliente"
                    >
                </div>

                <div class="editarItem">
                    <label>Nacionalidad</label>
                    <input
                        type="text"
                        id="editarNacionalidadCliente"
                    >
                </div>

                <div class="editarItem">
                    <label>Puntuación</label>
                    <input
                        type="text"
                        id="editarPuntuacionCliente"
                    >
                </div>

                <div class="editarItem">
                    <label>Comentarios míos</label>
                    <input
                        type="text"
                        id="editarComentariosMiosCliente"
                    >
                </div>

                <div class="editarItem">
                    <label>Número cancelaciones</label>
                    <input
                        type="text"
                        id="numeroCancelacionesCliente"
                        readonly
                    >
                </div>

                <div class="editarItem">
                    <label>Número no-presentados</label>
                    <input
                        type="text"
                        id="numeroNoPresentadosCliente"
                        readonly
                    >
                </div>

                <div class="editarItem">
                    <label>Número reservas</label>
                    <input
                        type="text"
                        id="numeroReservasCliente"
                        readonly
                    >
                </div>

                <div class="editarItem">
                    <label>Última visita</label>
                    <input
                        type="text"
                        id="ultimaVisitaCliente"
                        readonly
                    >
                </div>

                <button type="button" id="btnEditarCliente">
                    Editar Cliente
                </button>

                <p id="estadoOperacionCliente"></p>

            </form>
        </div>
    `;

    const idCliente = document.getElementById("idCliente");
    const editarCorreoCliente = document.getElementById("editarCorreoCliente");
    const editarTelefonoCliente = document.getElementById("editarTelefonoCliente");
    const editarNombreClienteCliente = document.getElementById("editarNombreClienteCliente");
    const editarNacionalidadCliente = document.getElementById("editarNacionalidadCliente");
    const editarPuntuacionCliente = document.getElementById("editarPuntuacionCliente");
    const editarComentariosMiosCliente = document.getElementById("editarComentariosMiosCliente");
    const numeroCancelacionesCliente = document.getElementById("numeroCancelacionesCliente");
    const numeroNoPresentadosCliente = document.getElementById("numeroNoPresentadosCliente");
    const numeroReservasCliente = document.getElementById("numeroReservasCliente");
    const ultimaVisitaCliente = document.getElementById("ultimaVisitaCliente");
    const botonCliente = document.getElementById("btnEditarCliente");


    idCliente.value = cliente.id ?? "";
    editarCorreoCliente.value = cliente.correo ?? "";
    editarTelefonoCliente.value = cliente.prefijo + " "+cliente.telefono ?? "";
    editarNombreClienteCliente.value = cliente.nombre ?? "";
    editarNacionalidadCliente.value = cliente.nacionalidad ?? "";
    editarPuntuacionCliente.value = cliente.score ?? "";
    editarComentariosMiosCliente.value = cliente.comentarios ?? "";
   
    const estadisticas = await obtenerEstadisticasCliente(cliente.id);

    if (estadisticas) {
        numeroCancelacionesCliente.value =
            estadisticas.canceladas ?? 0;

        numeroNoPresentadosCliente.value =
            estadisticas.no_aparecidas ?? 0;

        numeroReservasCliente.value =
            estadisticas.total_reservas ?? 0;

        ultimaVisitaCliente.value =
            estadisticas.ultima_visita ?? "Nunca";
    } else {
        numeroCancelacionesCliente.value = 0;
        numeroNoPresentadosCliente.value = 0;
        numeroReservasCliente.value = 0;
        ultimaVisitaCliente.value = "Nunca";
    }
    botonCliente.addEventListener("click", async () => {
        const resultado = await modificarCliente(
            idCliente.value,
            editarTelefonoCliente.value,
            editarCorreoCliente.value,
            editarNombreClienteCliente.value,
            editarNacionalidadCliente.value,
            editarPuntuacionCliente.value,
            editarComentariosMiosCliente.value
        );
        if (resultado) {
            document.getElementById("estadoOperacionCliente").innerText =
                "Se ha modificado correctamente";
        } else {
            document.getElementById("estadoOperacionCliente").innerText =
                "Ha habido un error";
        }
    });

}

function mostrarPanelEditarReserva(reserva,cliente, dia){
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
                    <p id="estadoOperacion"></p>
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
    const estadoOperacion = document.getElementById("estadoOperacion");

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

    //mesa id da error si no pones nada
    botonReserva.addEventListener("click", async ()=>{
        const resultado = await modificarReserva(
            idReserva.value,
            editarIdClienteReserva.value,
            editarMesaReserva.value || null,
            editarFechaReserva.value,
            editarHoraInicioReserva.value || null,
            editarHoraFinReserva.value || null,
            editarEstadoReservaSelect.value,
            editarTipoReservaSelect.value,
            editarPersonasReserva.value
        );
        if (resultado){
            let reservaModificada= {...reserva};
            reservaModificada.cliente_id = editarIdClienteReserva.value;
            reservaModificada.mesa_id = editarMesaReserva.value;
            reservaModificada.fecha = editarFechaReserva.value;
            reservaModificada.hora_inicio = editarHoraInicioReserva.value || null;
            reservaModificada.hora_fin = editarHoraFinReserva.value || null;
            reservaModificada.estado = editarEstadoReservaSelect.value;
            reservaModificada.tipo_reserva = editarTipoReservaSelect.value;
            reservaModificada.personas = editarPersonasReserva.value;
            estadoOperacion.innerText = "Se ha modificado correctamente";
            if(!dia) await cargarReservas( "orr", reserva.estado,);
            else await cargarReservasDia(reserva.fecha, "orr","todas" );
            mostrarPanelEditarReserva(reservaModificada,cliente, dia);
        }
        else{
            estadoOperacion.innerText ="Ha habido un error";
        }
        

        
    })
}




function crearTarjeta(reserva, cliente, dia, filtro, estado) {
    
    const fecha = new Date(reserva.fecha);

    const fechaFormateada = fecha.toLocaleDateString("es-ES");
    const fechaApi = reserva.fecha.slice(0,10);
    const hora = reserva.hora_inicio.slice(0, 5);

    let estadoReserva = reserva.estado;
    console.log(`crear tarjeta: ${reserva.id} : ${cliente.id} : ${estadoReserva}`)

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

        if(!dia)await cargarReservas(filtro, estado );
        else await cargarReservasDia(fechaApi, filtro, estado)

    })
    rechazarReserva.addEventListener("click", async ()=>{
        await cambiarEstadoReserva(reserva.id,"denegada")
        if(!dia) await cargarReservas(filtro, estado );
        else await cargarReservasDia(fechaApi, filtro , estado);
    })
    archivarReserva.addEventListener("click", async()=>{
        await cambiarEstadoReserva(reserva.id, "archivada");
        if(!dia) await cargarReservas(filtro, estado );
        else await cargarReservasDia(fechaApi, filtro, estado);

    })

    clienteInfoPanel.addEventListener("click", ()=>{
        mostrarPanelCliente(cliente);
    })
    editarReservaPanel.addEventListener("click",()=>{
        mostrarPanelEditarReserva(reserva,cliente,dia);
    })

    return tarjeta;
}
