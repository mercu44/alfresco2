const container = document.getElementById("menu-container");
const API = window.location.hostname === "localhost"? "http://localhost:3000/api": "/api";

console.log("idioma: "+idioma);
cargarCarta(idioma);

async function cargarCarta(idioma){
    const respuesta = await fetch(
    `${API}/carta?idioma=${idioma}`
    );
    const datos = await respuesta.json();
    let categoria = "";
    datos.forEach(plato=>{
        if (plato.categoria !== categoria){
            categoria = plato.categoria;
            container.innerHTML += `
            <section class="categoria">

                <h2>${plato.categoria}</h2>

            </section>
                
            `
        }
        const seccion = container.lastElementChild;
        seccion.innerHTML += `
        <article class="plato">
            <div>
                <h3>${plato.nombre}</h3>
                <p>${plato.descripcion}</p>
            </div>
            <span>${plato.precio}</span>
        </article>
    `;


});
}
