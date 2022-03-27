// VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



// EVENT LIsTENERS
eventListeners();

function eventListeners() {
    
    formulario.addEventListener('submit', agregarTweet);

    // documento listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);

        creatHTML();
    })
}



// FUNCIONES
function agregarTweet(e) {
    e.preventDefault();

    // Donde se escribe
    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio')
        return;
    }

    const tweetobj = {
        id: Date.now(),
        tweet: tweet
    }

    // AÑADIR LOS TWEETS 
    tweets = [...tweets, tweetobj];
    console.log(tweets);

    // Agregar HTML
    creatHTML();

    // REINICIAR FORMULARIO
    formulario.reset();
}

// Mostrar mensaje

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertarlo en el HTML

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError)

    setTimeout( () => {
        mensajeError.remove();
    }, 2000);
}

// Listaod de TWEETS

function creatHTML() {

    limpiarHTML();
    
    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            // HTML
            const li = document.createElement('li')

            // AÑADIR EL TEXTO
            li.innerText = tweet.tweet;

            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// AGREGAR al LOCAL STOGARE
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


// LIMPIAR HTML

function limpiarHTML() {

    while ( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}



