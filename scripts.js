const API_URL = "http://localhost:3000/productos"
const divPeliculas = document.getElementById("general")

const URL_TIPO = "http://localhost:3000/productos/?tipo="

const URL_GENERO = "http://localhost:3000/productos/?genero="

const URL_QUERY = "http://localhost:3000/productos/?q="

const buscar = document.getElementById("formulario")

const selectGen = document.getElementById("genero")

const selectCont = document.getElementById("contenido")

const entrada = document.getElementById("entrada")

const traerPeliculas = async (_API_URL) => {
    const peticion = await fetch(_API_URL)
    const response = await peticion.json()
    try {

        if (response.length > 0) {
            divPeliculas.innerHTML = ``
            response.forEach(element => {
                const { nombre, puntaje, genero, imagen, tipo } = element
                const div = document.createElement("div")
                div.setAttribute("class", "cards")
                div.innerHTML = `<div id="Image">
                <div id="cardSup">
                    <img src="${imagen}" alt="">
                </div>
                <div id="cardInf">
                    <h1>${nombre}</h1>
                </div>
                <div id="sup2">
                    <label id="type" type="button">${tipo}</label>
                    <label id="gender" type="button">${genero}</label>
                    <label id="puntaje">${puntaje}</label>
                </div>
            </div>`
                divPeliculas.appendChild(div)
            });
        }
    } catch (error) {
        console.log(error)
    }
}
traerPeliculas(API_URL)

buscar.addEventListener("submit", (e) => {
    e.preventDefault();

    const genero = selectGen.value;
    const contenido = selectCont.value;
    const enter = (entrada.value).toUpperCase().trim();
    if (genero && genero !== "") {
        traerPeliculas(URL_GENERO + genero)
        genero.value = ""
    } else if (contenido && contenido !== "") {
        traerPeliculas(URL_TIPO + contenido)
        contenido.value = ""
    } else if (enter && enter !== "") {
        traerPeliculas(URL_QUERY + enter)
        enter.value = ""
    } else {
        window.location.reload()
    }
})