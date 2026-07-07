const container = document.getElementById("menu-container");

MENU.forEach(categoria=>{
    container.innerHTML += `

        <section class="categoria">

            <h2>${categoria.categoria}</h2>

            ${categoria.platos.map(plato=>`

                <article class="plato">

                    <div>

                        <h3>${plato.nombre}</h3>

                        <p>${plato.descripcion}</p>

                    </div>

                    <span>${plato.precio}</span>

                </article>

            `).join("")}

        </section>

    `;

});