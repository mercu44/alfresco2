const API = window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "/api";

const token = localStorage.getItem("token");


const listaReservas = document.getElementById("listaReservas");
const numReservas = document.getElementById("numReservas");
const estadoFormulario = document.getElementById("estadoForm");
const estadoSelect = document.getElementById("estadoSelect");

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
