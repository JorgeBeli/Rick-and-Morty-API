const home = document.querySelector('h1')
const defaultPage = document.querySelector('#default')
const contenedor = document.querySelector('.character__wraper')
const personaje = document.querySelector('.character__info')
const actualPage = document.querySelector('.characters__page')
const previousPage = document.querySelector('#previous__page')
const currentPage = document.querySelector('#current__page')
const nextPage = document.querySelector('#next__page')
const botones = document.querySelector('.buttons')
const contenedorStatus = document.querySelector('.card__info--left__status')
const estado = document.querySelector('#status')
const dropdownButton = document.querySelector('.dropdown__button')
const dropdown = document.querySelector('.dropdown')
const optionsDropdown = document.querySelector('.options__wraper')

const paginaActual = (pagina) =>{
    currentPage.innerHTML = pagina
}

const resultadoAPI = () =>{
    fetch("https://rickandmortyapi.com/api/character")
    .then(respuesta => respuesta.json())
    .then(data => {
        console.log(data)
        contenedor.innerHTML = subirAHTML(data.results)
        let pagina = 1
        nextPage.addEventListener('click', () =>{
            let siguie = data.info.next
            if(siguie === null){
                desactivarSiguiente()
            }else if(siguie !== null){
                const redefinir = async() =>{
                    respuesta = await fetch(data.info.next)
                    data = await respuesta.json()
                    contenedor.innerHTML = subirAHTML(data.results)
                }
                redefinir()
                pagina += 1
                paginaActual(pagina)
                activarAtras()
                activarPrimeraPagina()
                window.scrollTo({top: 0, behavior: 'smooth'})
            }
        })
        previousPage.addEventListener('click', () =>{
            if(data.info.prev === null){
                desactivarAtras()
            }else if(data.info.prev !== null){
                const previa = async() =>{
                    respuesta = await fetch(data.info.prev)
                    data = await respuesta.json()
                    contenedor.innerHTML = subirAHTML(data.results)
                }
                window.scrollTo({top: 0, behavior: 'smooth'})
                previa()
                pagina -= 1
                paginaActual(pagina)
            }
        })
        paginaActual(pagina)
        agregarEventoPersonajes()
        personaje.innerHTML = personajeInformacionAHTML(data.results)
        activarSiguientesDesactivarPrevios()
    })
    .catch( () => {console.log('salio mal')})
}

defaultPage.addEventListener('click', () =>{
    window.location.reload()
})
actualPage.innerHTML = 'Characters'
actualPage.style.color = '#ece8e7'
window.scrollTo({top: 0, behavior: 'smooth'})
paginaActual()
resultadoAPI()

const subirAHTML = (array) =>{
    const datos = array.reduce((acc,curr)=>{
        return acc + `
            <div class='personaje' id='${curr.id}'>
                <div class='personaje__img'>
                    <img src=${curr.image}>
                </div>
                <div class='personaje__info'>
                    <h2>${curr.name}</h2>
                    <p>${curr.status} - ${curr.species} - ${curr.gender}</p>
                </div>
                <div class='personaje__info--abajo'>
                    <p>Origin Location: </p>
                    <p>${curr.origin.name}</p>
                    <p>Last know location: </p>
                    <p>${curr.location.name}</p>
                </div>
            </div>
        `
    },'')
    return datos
}

const personajeInformacionAHTML = (data) =>{
    return `
        <article class='card__wraper'>
            <div class='card__info--left__last__location'>
                <p>Last know location:</p>
                <p>${data.location.name}</p>
            </div>
            <div class='card__info--left__created'>
                <p>Register created: </p>
                <p>${data.created}</p>
                <p>Number of times seen:</p>
                <p>${data.episode.length}</p>
            </div>
            <div class='card__info--left__status'>
                <p id='status'>${data.status}</p>
            </div>
            <div class='card__info--img'>
                <img src='${data.image}' alt='${data.name}'>
            </div>
            <div class='card__info--right__name'>
                <h3>${data.name}</h3>
            </div>
            <div class='card__info--right__vitals'>
                <p>Status: </p>
                <p>${data.status}</p>
                <p>Species: </p>
                <p>${data.species}</p>
            </div>
            <div class='card__info--right__location'>
                <p>Gender: </p>
                <p>${data.gender}</p>
                <p>Origin Location:</p>
                <p>${data.origin.name}</p>
            </div>
        </article>
    `
}

const infoPersonaje = async(id) =>{
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const data = await respuesta.json()
    personaje.innerHTML = personajeInformacionAHTML(data)
    enfocarPersonaje()
}

const agregarEventoPersonajes = () =>{
    const personajes = document.querySelectorAll('.personaje')
    for(let i=0;i < personajes.length ;i++){
        personajes[i].addEventListener('click', () => {
            const id = personajes[i].id
            infoPersonaje(id)
        })
    }
}

home.addEventListener('click', () => {
    contenedor.style.display = 'grid'
    personaje.style.display = 'none'
    botones.style.display = 'flex'
})

const enfocarPersonaje = () => {
    contenedor.style.display = 'none'
    personaje.style.display = 'flex'
    botones.style.display = 'none'
    vivoOMuerto()
}

const desactivarAtras = () =>{
    previousPage.disabled = true
    previousPage.style.cursor = 'not-allowed'
    previousPage.style.color = '#303030'
}

const activarAtras = () =>{
    previousPage.disabled = false
    previousPage.style.cursor = 'pointer'
    previousPage.style.color = '#fff'
}

const desactivarSiguiente = () =>{
    nextPage.disabled = true
    nextPage.style.cursor = 'not-allowed'
    nextPage.style.color = '#303030'
}

const activarSiguiente = () =>{
    nextPage.disabled = false
    nextPage.style.cursor = 'pointer'
    nextPage.style.color = '#fff'
}

const activarPrevioDesactivarSiguientes = () =>{
    activarAtras()
    activarPrimeraPagina()
    desactivarSiguiente()
    desactivarUltimaPagina()
}

const activarSiguientesDesactivarPrevios = () =>{
    desactivarAtras()
    desactivarPrimeraPagina()
    activarSiguiente()
    activarUltimaPagina()
}

const vivoOMuerto = () =>{
    const cargaron = setTimeout(()=>{
        const contenedorStatus = document.querySelector('.card__info--left__status')
        const estado = document.querySelector('#status')
        console.log(contenedorStatus)
        console.log(estado)
        if(estado.innerHTML === 'Alive'){
            contenedorStatus.style.background = '#88ff00'
        }else if(estado.innerHTML === 'Dead'){
            contenedorStatus.style.background = '#cc0000'
        }else{
            contenedorStatus.style.background = '#808080'
        }
    })
    cargaron
}

const moverPagina = async() =>{
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
    const data = await respuesta.json()
    contenedor.innerHTML = subirAHTML(data.results)
    paginaActual()
    agregarEventoPersonajes()
    window.scrollTo({top: 0, behavior: 'smooth'})
}

dropdownButton.addEventListener('click', () =>{
    dropdown.classList.toggle('visible')
    agregarEventoDropdown()
})

const opcion = async(estado) =>{
    let respuesta = await fetch(`https://rickandmortyapi.com/api/character/?page=1&status=${estado}`)
    let data = await respuesta.json()
    contenedor.innerHTML = subirAHTML(data.results)
    let pagina = 1
    console.log(data)
    nextPage.addEventListener('click', () =>{
        if(data.info.next === null){
            desactivarSiguiente()
        }else if(data.info.next !== null){
            const sig = async() =>{
                respuesta = await fetch(data.info.next)
                data = await respuesta.json()
                contenedor.innerHTML = subirAHTML(data.results)
            }
            window.scrollTo({top: 0, behavior: 'smooth'})
            sig()
            pagina += 1
            paginaActual(pagina)
        }
    })
    previousPage.addEventListener('click', () =>{
        if(data.info.prev === null){
            desactivarAtras()
        }else if(data.info.next !== null){
            const previa = async() =>{
                respuesta = await fetch(data.info.prev)
                data = await respuesta.json()
                contenedor.innerHTML = subirAHTML(data.results)
            }
            window.scrollTo({top: 0, behavior: 'smooth'})
            previa()
            pagina -= 1
            paginaActual(pagina)
        }
    })
    agregarEventoPersonajes()
}

const agregarEventoDropdown = () =>{
    const opciones = document.querySelectorAll('.option')
    for(let i = 0; i < opciones.length; i++){
        opciones[i].addEventListener('click', () =>{
            let id = opciones[i].id
            if(id === 'aliveOption'){
                opcion('alive')
                actualPage.innerHTML = 'Characters Alive'
                dropdown.classList.remove('visible')
            }else if(id === 'deadOption'){
                opcion('dead')
                actualPage.innerHTML = 'Characters Dead'
                dropdown.classList.remove('visible')
            }else if(id === 'unknownOption'){
                opcion('unknown')
                actualPage.innerHTML = 'Characters Unknown'
                dropdown.classList.remove('visible')
            }
        })
    }
}