const API = "/api";
const formulario = document.getElementById("login");

formulario.addEventListener("submit", iniciarSesion);

async function iniciarSesion(evento){
    evento.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;
    console.log(usuario);
    console.log(password);
    const respuesta = await fetch(
        `${API}/login`,

    {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            usuario,
            password

        })

    }
    );
    console.log(respuesta);
    const datos = await respuesta.json();
    console.log(datos.token);
    localStorage.setItem("token", datos.token);
    const token = localStorage.getItem("token");
    window.location.href= "../admin/"
}




