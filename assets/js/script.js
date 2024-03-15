const albums = [
    "5327691",
    "363906907",
    "217489292",
    "359324967",
    "324894",
    "65373012",
];
const albums2 = [
    "125958",
    "43681",
    "754485",
    "14781033",
    "502369701",
    "13994766",
];
const albums3 = [
    "333758737",
    "547047802",
    "256224762",
    "556764162",
    "115603002",
    "65373012",
];
const albums4 = [
    "182383222",
    "249141",
    "549720102",
    "288437072",
    "6240279",
    "77201",
    "69319552",
    "418720487",
];
const albums5 = [
    "9411436",
    "81931",
    "299821",
    "261026872",
    "1238967",
    "302204417",
    "182383222",
    "249141",
    "549720102",
    "288437072",
    "6240279",
    "77201",
    "69319552",
    "418720487",
    "261026872",
    "1238967",
    "302204417",
    "182383222",
    "249141",
    "549720102",
    "288437072",
    "6240279",
    "77201",
    "69319552",
    "418720487",
];

const apiPrincipale =
    "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const apiAlbum =
    "https://deezerdevs-deezer.p.rapidapi.com/album/";
const apiBaseURL = "https://deezerdevs-deezer.p.rapidapi.com/";
const options = {
    headers: {
        'X-RapidAPI-Key': '5d20013f3dmshb856ab3131e0cd8p13fd7cjsnf802b5358836',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
}

let item;
window.addEventListener("load", init);
async function init() {
    await Promise.all([
        loadAlbums(),
        loadMiniCards(),
        loadNavbarCards(),
    ]);
}

const divCanzoni = document.getElementById("canzoni");
const divCanzoni2 = document.getElementById("canzoni2");
const divCanzoni3 = document.getElementById("canzoni3");

let albumsObjects = [];
let albumsObjects2 = [];
let albumsObjects3 = [];
let albumsObjects4 = [];
let albumsObjects5 = [];

async function loadAlbums() {
    try {
        for (let i = 0; i < albums.length; i++) {
            const response = await fetch(apiAlbum + albums[i],options);
            const itemProva = await response.json();
            albumsObjects.push(itemProva);
        }
        displayAlbumCard(albumsObjects, divCanzoni, 1);
        for (let i = 0; i < albums2.length; i++) {
            const response = await fetch(apiAlbum + albums2[i],options);
            const itemProva = await response.json();
            albumsObjects2.push(itemProva);
        }
        displayAlbumCard(albumsObjects2, divCanzoni2, 2);
        for (let i = 0; i < albums3.length; i++) {
            const response = await fetch(apiAlbum + albums3[i],options);
            const itemProva = await response.json();
            albumsObjects3.push(itemProva);
        }
        displayAlbumCard(albumsObjects3, divCanzoni3, 3);
    } catch (error) {
        console.log(error);
    }
}

function displayAlbumCard(albumsObjectsArray, destinationDiv, numero) {
    albumsObjectsArray.forEach((albumsObject) => {
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `<div class="me-3 rounded-2 p-3 h-100 cardhover">
            <div class="card position-relative bg-transparent border-0" style="width: 12rem">
                <img onclick="gotoAlbumPage(${albumsObject.id})" src="${albumsObject.cover_xl}" class="card-img-top linkhover" alt="..." />
                <button class="btnPlay position-absolute top-0 end-0 btn btn-success rounded-5"><i class="bi bi-play-fill"></i></button>
                <div class="card-body">
                    <h5 class="text-white">${albumsObject.title}</h5>
                    <p class="card-text text-white">
                        ${albumsObject.artist.name}
                    </p>
                    
                </div>
            </div>
        </div>`;

        const btnPlay = cardDiv.querySelector(".btnPlay");
        btnPlay.addEventListener("click", () => playAlbum(albumsObject, numero));
        destinationDiv.appendChild(cardDiv);
    });
}
function gotoAlbumPage(id) {

  window.location.href = `album.html?id=${id}`;
}

function playAlbum(album, numero) {
    const trackUrl = album.tracks.data[0].preview;
    if (trackUrl) {
        // Riproduci la traccia
        playAudio(trackUrl, numero);

        // Estrai le informazioni della traccia
        const trackImage = album.cover_xl;
        const trackTitle = album.title;
        const trackArtist = album.artist.name;
  
        // Aggiorna il contenuto del div "songInfo" con le informazioni della traccia
        const songInfoDiv = document.getElementById("songInfo");
        songInfoDiv.innerHTML = ` 
            <div class="image-container">
                <img src="${trackImage}" alt="Track Image">
            </div>
            <div class="song-description">
                <p class="title">${trackTitle}</p>
                <p class="artist">${trackArtist}</p>
            </div>
            <div class="icons">
                <i class="fs-4 linkhover bi bi-heart"></i>
            </div>`;
    } else {
        console.error("Track preview not available");
    }
}


async function searchDeezer() {
    const query = document.getElementById("search-input").value;
    fetch(`${apiBaseURL}search?q=${query}`,options)
        .then((response) => response.json())
        .then((data) => {
            displayResults(data.data);
        })
        .catch((error) => {
            console.error("Error searching tracks: ", error);
        });
}

function displayResults(tracks) {
    const resultsDiv = document.getElementById("search-results");
    resultsDiv.innerHTML = "";
    tracks.forEach((track) => {
        const trackDiv = document.createElement("div");
        trackDiv.innerHTML = `${track.title} - ${track.artist.name}`;
        trackDiv.addEventListener("click", () => playTrack(track.id));
        resultsDiv.appendChild(trackDiv);
    });
}

function playTrack(trackId) {
    fetch(`${apiBaseURL}track/${trackId}`,options)
        .then((response) => response.json())
        .then((data) => {
            const trackUrl = data.preview;
            if (trackUrl) {
                playAudio(trackUrl);
            } else {
                console.error("Track preview not available");
            }
        })
        .catch((error) => {
            console.error("Error fetching track details: ", error);
        });
}

let currentAudioPlayer;
let currentAlbum;

// Funzione per riprodurre una traccia audio
function playAudio(trackUrl, numero) {
    currentAlbum = numero
    if (currentAudioPlayer) {
        currentAudioPlayer.pause(); // Interrompe la traccia attualmente in riproduzione
    }

    // Crea un nuovo player audio
    const audioPlayer = new Audio(trackUrl);
    
    currentAudioPlayer = audioPlayer; // Memorizza il nuovo player audio come traccia attualmente in riproduzione
togglePlay();
    updateProgress();
}
// Funzione per aggiornare la barra di avanzamento
function updateProgress() {
    const progressBar = document.querySelector(".progress");
    const currentTime = currentAudioPlayer.currentTime;
    const duration = currentAudioPlayer.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Aggiorna il tempo corrente nella barra di avanzamento
    const currentTimeElement = document.querySelector(
        ".progress-container span:first-child"
    );
    currentTimeElement.textContent = formatTime(currentTime);

    // Aggiorna il tempo rimanente nella barra di avanzamento
    const remainingTime = duration - currentTime;
    const remainingTimeElement = document.querySelector(
        ".progress-container span:last-child"
    );
    remainingTimeElement.textContent = formatTime(remainingTime);

    // Richiama la funzione nuovamente dopo un breve intervallo
    setTimeout(updateProgress, 500);
}

// Funzione per formattare il tempo in formato mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

let currentAlbumIndex = 0;

// Funzione per riprodurre o mettere in pausa una traccia audio
function togglePlay() {
    if (currentAudioPlayer.paused) {
        currentAudioPlayer.play();
        document.getElementById("play").classList.remove("bi-play");
        document.getElementById("play").classList.add("bi-pause");
    } else {
        currentAudioPlayer.pause();
        document.getElementById("play").classList.remove("bi-pause");
        document.getElementById("play").classList.add("bi-play");
    }
}

// Funzione per passare alla canzone successiva
function nextSong() {
    switch (currentAlbum) {
        case 1: 
            currentAlbumIndex = (currentAlbumIndex + 1) % albumsObjects.length;
            playAlbum(albumsObjects[currentAlbumIndex], 1);
            break;
        case 2:
            currentAlbumIndex = (currentAlbumIndex + 1) % albumsObjects2.length;
            playAlbum(albumsObjects2[currentAlbumIndex], 2);
            break;
        case 3:
            currentAlbumIndex = (currentAlbumIndex + 1) % albumsObjects3.length;
            playAlbum(albumsObjects3[currentAlbumIndex], 3);
            break;
        case 4:
            currentAlbumIndex = (currentAlbumIndex + 1) % albumsObjects4.length;
            playAlbum(albumsObjects4[currentAlbumIndex], 4);
            break;
        case 5:
            currentAlbumIndex = (currentAlbumIndex + 1) % albumsObjects5.length;
            playAlbum(albumsObjects5[currentAlbumIndex], 5);
            break;
    }
}

// Funzione per passare alla canzone precedente
function previousSong() {
    switch (currentAlbum) {
        case 1: 
            currentAlbumIndex = (currentAlbumIndex - 1 + albumsObjects.length) % albumsObjects.length;
            playAlbum(albumsObjects[currentAlbumIndex], 1);
            break;
        case 2:
            currentAlbumIndex = (currentAlbumIndex - 1 + albumsObjects2.length) % albumsObjects2.length;
            playAlbum(albumsObjects2[currentAlbumIndex], 2);
            break;
        case 3:
            currentAlbumIndex = (currentAlbumIndex - 1 + albumsObjects3.length) % albumsObjects3.length;
            playAlbum(albumsObjects3[currentAlbumIndex], 3);
            break;
        case 4:
            currentAlbumIndex = (currentAlbumIndex - 1 + albumsObjects4.length) % albumsObjects4.length;
            playAlbum(albumsObjects4[currentAlbumIndex], 4);
            break;
        case 5:
            currentAlbumIndex = (currentAlbumIndex - 1 + albumsObjects5.length) % albumsObjects5.length;
            playAlbum(albumsObjects4[currentAlbumIndex], 5);
            break;
    }
}

// Aggiungi gestori di eventi per i pulsanti
document.getElementById("play").addEventListener("click", togglePlay);
document.getElementById("forward").addEventListener("click", nextSong);
document.getElementById("backward").addEventListener("click", previousSong);

//regolatore volume
document.addEventListener("DOMContentLoaded", function () {
    let volumeControl = document.getElementById("volumeControl");

    volumeControl.addEventListener("input", function () {
        let volume = volumeControl.value / 100; // Converti il valore in scala da 0 a 1
        if (currentAudioPlayer) {
            currentAudioPlayer.volume = volume; // Imposta il volume dell'audio attualmente in riproduzione
        }
    });
});

// parte popolamento mini cards
const divMiniCards = document.getElementById("mini-cards");

async function loadMiniCards() {
    try {
        for (let i = 0; i < albums4.length; i++) {
            const response = await fetch(apiAlbum + albums4[i],options);
            const itemProva = await response.json();
            albumsObjects4.push(itemProva);
        }
        displayMiniCard();
        console.log(albumsObjects4);
    } catch (error) {
        console.log(error);
    }
}

function displayMiniCard() {
    albumsObjects4.forEach((albumsObject) => {
        const divCard = document.createElement("div");
        divCard.classList.add("col-6", "col-xxl-3");
        divCard.innerHTML = `
  <div class="d-flex flex-row cardhover p-0 position-relative">
    <div class="d-flex align-items-center ">
      <img width="47" src="${albumsObject.cover_xl}" alt="img" />
      <button class="btnPlay btn-sm btn-lg position-absolute end-0 btn btn-success rounded-5"><i class="bi bi-play-fill"></i></button>
      <div class="ms-3 d-flex flex-column text-white">
        <p class="mb-0">${albumsObject.title}</p>
      </div>
    </div>
  </div>
`;
        const btnPlay = divCard.querySelector(".btnPlay");
        btnPlay.addEventListener("click", () => playAlbum(albumsObject, 4));
        divMiniCards.appendChild(divCard);
    });
}

const divNavbarCards = document.getElementById("navbarCards");

async function loadNavbarCards() {
    try {
        for (let i = 0; i < albums5.length; i++) {
            const response = await fetch(apiAlbum + albums5[i],options);
            const itemProva = await response.json();
            albumsObjects5.push(itemProva);
        }
        displayNavbarCard();
        console.log(albumsObjects5);
    } catch (error) {
        console.log(error);
    }
}

function displayNavbarCard() {
    albumsObjects5.forEach((albumsObject) => {
        const divNavbarCard = document.createElement("div");
        divNavbarCard.classList.add("d-flex", "flex-row", "rounded-2", "justify-content-center", "p-2", "justify-content-lg-start", "ms-3", "my-3", "linkhover", "cardhover");
        divNavbarCard.innerHTML = `
  <div class="d-flex  align-items-center">
    <img
      width="47"
      class="rounded-5"
      src="${albumsObject.cover_xl}"
      alt="img" 
    />
  </div>
  <div class="ms-3 d-none d-lg-flex  flex-column text-white">
    <p class="mb-0 text-white">${albumsObject.title}</p>
    <p class="mb-0 text-white">${albumsObject.artist.name}</p>
  </div>
`;
divNavbarCard.addEventListener("click", function(){
gotoAlbumPage(albumsObject.id);
})

        divNavbarCards.appendChild(divNavbarCard);
    });
}

