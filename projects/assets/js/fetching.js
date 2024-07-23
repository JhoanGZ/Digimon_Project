(async () => {
    try {
        const respuesta = await fetch("https://digimon-api.vercel.app/api/digimon");

        if (!respuesta.ok) {
            throw new Error("La solicitud HTTP falló");
        }
        const data = await respuesta.json();
        console.table(data);

        // Ordenar el array data de forma alfabética por el nombre del digimon
        data.sort((a, b) => a.name.localeCompare(b.name));

        const dropdownContent = document.querySelector(".dropdown-content");
        const cardContainer = document.getElementById("cardContainer");
        const imagenCard = document.getElementById("imagenCard");
        const nombreCard = document.getElementById("nombreCard");
        const nivelCard = document.getElementById("nivelCard");

        data.forEach((digimon) => {
                const dropdownItem = document.createElement("a");
                dropdownItem.classList.add("dropdown-item");
                dropdownItem.textContent = digimon.name;
                dropdownItem.href = "#";
                dropdownItem.addEventListener("click", (event) => {
                    event.preventDefault();

                    // Actualizar el contenido de la tarjeta (card) con los datos del digimon seleccionado
                    imagenCard.src = digimon.img;
                    nombreCard.textContent = digimon.name;
                    nivelCard.textContent = `Nivel: ${digimon.level}`;

                    // Mostrar la tarjeta (card)
                    cardContainer.style.display = "block";

                    // Cerrar el menú dropdown
                    document.querySelector(".dropdown").classList.remove("is-active");
                });

                dropdownContent.appendChild(dropdownItem);
            }
        );

        const dropdownButton = document.querySelector(".dropdown-trigger button");
        dropdownButton.addEventListener("click", () => {
                // Alternar la clase is-active para abrir y cerrar el dropdown
                document.querySelector(".dropdown").classList.toggle("is-active");
            }
        );

    } catch (error){
        console.error("Ocurrió un error:", error);
    }
})();
