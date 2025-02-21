document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("buzon-cartas")) {
        mostrarCartas();
    } else if (document.getElementById("carta-titulo")) {
        mostrarCartaAbierta();
    }
});

function guardarCarta() {
    const fecha = document.getElementById("fecha").value;
    const titulo = document.getElementById("titulo").value;
    const contenido = document.getElementById("contenido").value;
    const firma = document.getElementById("firma").value;

    if (!fecha || !titulo || !contenido || !firma) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const carta = { fecha, titulo, contenido, firma };
    let cartas = JSON.parse(localStorage.getItem("cartas")) || [];
    cartas.push(carta);
    localStorage.setItem("cartas", JSON.stringify(cartas));

    alert("Carta guardada con éxito.");
    document.getElementById("fecha").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("contenido").value = "";
    document.getElementById("firma").value = "";
}

function mostrarCartas() {
    const contenedor = document.getElementById("buzon-cartas");
    contenedor.innerHTML = "";
    let cartas = JSON.parse(localStorage.getItem("cartas")) || [];

    if (cartas.length === 0) {
        contenedor.innerHTML = "<p>No hay cartas guardadas.</p>";
        return;
    }

    cartas.forEach((carta, index) => {
        const div = document.createElement("div");
        div.classList.add("carta-cerrada");
        div.innerHTML = `
            <div class="carta-info">
                <img src="cartacerrada.png" alt="Carta Cerrada" width="100" onclick="verCarta(${index})">
                <p><strong>${carta.fecha}</strong> - ${carta.firma}</p>
            </div>
            <button class="eliminar" onclick="borrarCarta(${index})">🗑️</button>
        `;
        contenedor.appendChild(div);
    });
}

function verCarta(index) {
    localStorage.setItem("cartaActual", index);
    window.location.href = "carta.html";
}

function mostrarCartaAbierta() {
    let cartas = JSON.parse(localStorage.getItem("cartas")) || [];
    let index = localStorage.getItem("cartaActual");

    if (index === null || !cartas[index]) {
        window.location.href = "buzon.html";
        return;
    }

    let carta = cartas[index];
    document.getElementById("carta-titulo").textContent = carta.titulo;
    document.getElementById("carta-fecha").textContent = carta.fecha;
    document.getElementById("carta-contenido").textContent = carta.contenido;
    document.getElementById("carta-firma").textContent = carta.firma;
}

function borrarCarta(index) {
    let cartas = JSON.parse(localStorage.getItem("cartas")) || [];
    cartas.splice(index, 1);
    localStorage.setItem("cartas", JSON.stringify(cartas));
    mostrarCartas();
}

function volverInicio() {
    window.location.href = "index.html";
}

function volverBuzon() {
    window.location.href = "buzon.html";
}