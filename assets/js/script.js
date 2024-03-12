const albums = [
    "5327691",
    "363906907",
    "217489292",
    "359324967",
    "324894",
    "65373012",
];
const albums2 = [
    "5327691",
    "363906907",
    "217489292",
    "359324967",
    "324894",
    "65373012",
];
const albums3 = [
    "5327691",
    "363906907",
    "217489292",
    "359324967",
    "324894",
    "65373012",
];

const apiPrincipale =
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const apiAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const apiBaseURL = "https://striveschool-api.herokuapp.com/api/deezer/";

let item;
window.addEventListener("load", init);
async function init() {
    // await loadProducts();
    await loadAlbums();
}


const divCanzoni = document.getElementById("canzoni");
let albumsObjects = [];
const loadAlbums = async () => {
    try {
        for (let i = 0; i < albums.length; i++) {
            const response = await fetch(apiAlbum + albums[i]);
            itemProva = await response.json();
            albumsObjects.push(itemProva);
        }
        displayAlbumCard();
        console.log(albumsObjects);
        console.log(albumsObjects[0].tracks.data[0].preview);
    } catch (error) {
        console.log(error);
    }
};



function displayAlbumCard() {
    albumsObjects.forEach((albumsObject) => {
    const cardDiv = document.createElement("div")    
        cardDiv.innerHTML = `<div class="me-3 rounded-2 p-3 h-100 cardhover">
        <div class="card bg-transparent border-0" style="width: 12rem">
            <img src="${albumsObject.cover_xl}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="text-white">${albumsObject.title}</h5>
                <p class="card-text text-white">
                   ${albumsObject.artist.name}
                </p>
            </div>
        </div>
    </div>`
        
        cardDiv.addEventListener('click', () => playAlbum(albumsObject));
        divCanzoni.appendChild(cardDiv);
    });
}

{/* <div class="row g-0 d-flex align-items-center">
                <div class="col-4">
                    <img src="${albumsObject.cover_xl}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-8">
                    <div class="card-body">
                        <p class="card-title text-white m-0 fs-6">${albumsObject.title}</p>
                    </div>
                </div>
            </div> */}
function playAlbum(album) {
    const trackUrl = album.tracks.data[0].preview;
    if (trackUrl) {
        playAudio(trackUrl);
    } else {
        console.error('Track preview not available');
    }
}



// Funzione per cercare una traccia su Deezer
function searchDeezer() {
    const query = document.getElementById('search-input').value;
    fetch(`${apiBaseURL}search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data.data);
        })
        .catch(error => {
            console.error('Error searching tracks: ', error);
        });
}

// Funzione per visualizzare i risultati della ricerca
function displayResults(tracks) {
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '';
    tracks.forEach(track => {
        const trackDiv = document.createElement('div');
        trackDiv.innerHTML = `${track.title} - ${track.artist.name}`;
        trackDiv.addEventListener('click', () => playTrack(track.id));
        resultsDiv.appendChild(trackDiv);
    });
}

// Funzione per riprodurre una traccia
function playTrack(trackId) {
    fetch(`${apiBaseURL}track/${trackId}`)
        .then(response => response.json())
        .then(data => {
            const trackUrl = data.preview;
            if (trackUrl) {
                playAudio(trackUrl);
            } else {
                console.error('Track preview not available');
            }
        })
        .catch(error => {
            console.error('Error fetching track details: ', error);
        });
}

let currentAudioPlayer;

// Funzione per riprodurre una traccia audio
function playAudio(trackUrl) {
    if (currentAudioPlayer) {
        currentAudioPlayer.pause(); // Interrompe la traccia attualmente in riproduzione
    }

    // Crea un nuovo player audio
    const audioPlayer = new Audio(trackUrl);
    audioPlayer.play(); // Avvia la nuova traccia audio
    currentAudioPlayer = audioPlayer; // Memorizza il nuovo player audio come traccia attualmente in riproduzione
}


let currentAlbumIndex = 0;

// Funzione per riprodurre o mettere in pausa una traccia audio
function togglePlay() {
    if (currentAudioPlayer.paused) {
        currentAudioPlayer.play();
        document.getElementById('play').classList.remove('bi-play');
        document.getElementById('play').classList.add('bi-pause');
    } else {
        currentAudioPlayer.pause();
        document.getElementById('play').classList.remove('bi-pause');
        document.getElementById('play').classList.add('bi-play');
    }
}

// Funzione per passare alla canzone successiva
function nextSong() {
    currentAlbumIndex = (currentAlbumIndex + 1) % albumsObjects.length;
    playAlbum(albumsObjects[currentAlbumIndex]);
}

// Funzione per passare alla canzone precedente
function previousSong() {
    currentAlbumIndex = (currentAlbumIndex - 1 + albumsObjects.length) % albumsObjects.length;
    playAlbum(albumsObjects[currentAlbumIndex]);
}

// Aggiungi gestori di eventi per i pulsanti
document.getElementById('play').addEventListener('click', togglePlay);
document.getElementById('forward').addEventListener('click', nextSong);
document.getElementById('backward').addEventListener('click', previousSong);