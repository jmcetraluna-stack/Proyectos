// Creamos las preguntas del cuestionario
const preguntas = [
    {
        pregunta: "¿En qué año nació San José de Calasanz?",
        opciones: ["1557", "1583", "1648"],
        correcta: 0
    },
    {
        pregunta: "¿Dónde nació?",
        opciones: ["Roma", "Peralta de la Sal", "Madrid"],
        correcta: 1
    },
    {
        pregunta: "¿Por qué decidió dedicarse a la educación?",
        opciones: [
            "Porque quería viajar por Europa",
            "Porque quería fundar una universidad",
            "Porque muchos niños pobres no podían estudiar"
        ],
        correcta: 2
    },
    {
        pregunta: "¿En qué año abrió su primera escuela gratuita en Roma?",
        opciones: ["1597", "1622", "1767"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál era su lema educativo?",
        opciones: ["Fe y Esperanza", "Piedad y Letras", "Ciencia y Progreso"],
        correcta: 1
    }
];

// Buscamos el contenido principal de la página
const contenido = document.querySelector("main");

if (contenido) {

    // Creamos el cuestionario
    const cuestionario = document.createElement("section");

    cuestionario.id = "cuestionario";

    cuestionario.style.backgroundColor = "#eee3d0";
    cuestionario.style.padding = "25px";
    cuestionario.style.marginTop = "25px";
    cuestionario.style.border = "1px solid #e3d7c3";
    cuestionario.style.borderRadius = "8px";

    cuestionario.innerHTML = `
        <h2>¿Cuánto sabés sobre San José de Calasanz?</h2>

        <p>Respondé las siguientes preguntas para poner a prueba tus conocimientos.</p>

        <form id="formulario">
            <div id="preguntas"></div>

            <button type="submit">
                Comprobar respuestas
            </button>
        </form>

        <p id="resultado"></p>

        <button id="reiniciar" type="button" hidden>
            Volver a intentar
        </button>
    `;

    // Agregamos el cuestionario al final de la página
    contenido.appendChild(cuestionario);

    const contenedorPreguntas = document.getElementById("preguntas");

    // Mostramos las preguntas y sus opciones
    preguntas.forEach(function(pregunta, indice) {

        let opcionesHTML = "";

        pregunta.opciones.forEach(function(opcion, numero) {

            opcionesHTML += `
                <label style="display:block; margin:7px 0;">
                    <input type="radio"
                    name="pregunta${indice}"
                    value="${numero}">

                    ${opcion}
                </label>
            `;

        });

        contenedorPreguntas.innerHTML += `
            <div style="background:#fffdf8; padding:12px;
            margin:15px 0; border:1px solid #e3d7c3;
            border-radius:5px;">

                <p>
                    <strong>${indice + 1}. ${pregunta.pregunta}</strong>
                </p>

                ${opcionesHTML}

            </div>
        `;

    });

    // Buscamos los elementos del formulario
    const formulario = document.getElementById("formulario");
    const resultado = document.getElementById("resultado");
    const botonReiniciar = document.getElementById("reiniciar");

    // Comprobamos las respuestas
    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        let puntaje = 0;
        let respondidas = 0;

        preguntas.forEach(function(pregunta, indice) {

            const respuesta = document.querySelector(
                'input[name="pregunta' + indice + '"]:checked'
            );

            if (respuesta !== null) {

                respondidas++;

                if (Number(respuesta.value) === pregunta.correcta) {
                    puntaje++;
                }

            }

        });

        // Verificamos que estén todas respondidas
        if (respondidas < preguntas.length) {

            resultado.textContent =
                "Tenés que responder todas las preguntas antes de comprobar.";

            return;
        }

        // Mostramos el puntaje
        resultado.textContent =
            "Tu resultado es " + puntaje + " de 5 respuestas correctas.";

        if (puntaje === 5) {

            resultado.textContent +=
                " ¡Excelente! Conocés muy bien su historia.";

        } else if (puntaje >= 3) {

            resultado.textContent +=
                " ¡Muy bien! Aprendiste bastante sobre Calasanz.";

        } else {

            resultado.textContent +=
                " Podés repasar la información e intentarlo otra vez.";

        }

        botonReiniciar.hidden = false;

    });

    // Reiniciamos el cuestionario
    botonReiniciar.addEventListener("click", function() {

        formulario.reset();

        resultado.textContent = "";

        botonReiniciar.hidden = true;

    });

}