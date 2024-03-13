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

const apiAlbum =
    "https://corsproxy.io/?https://striveschool-api.herokuapp.com/api/deezer/album/";

document.getElementById("cercaButton").addEventListener("click", redirectToPage);

function redirectToPage() {
  // Cambia 'url_della_pagina' con l'URL della pagina a cui vuoi reindirizzare l'utente
  window.location.href = 'artisti.html';
}

// navbar cards

window.addEventListener("load", init);
async function init() {
  await Promise.all([

    loadNavbarCards(),
  ]);
}



const divNavbarCards = document.getElementById("navbarCards");
let albumsObjects5 = [];


async function loadNavbarCards() {
  try {
    for (let i = 0; i < albums5.length; i++) {
      const response = await fetch(apiAlbum + albums5[i]);
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
    divNavbarCard.classList.add("d-flex", "flex-row", "ms-3", "my-3");
    divNavbarCard.innerHTML = `
  <div class="d-flex align-items-center">
    <img
      width="47"
      class="rounded-5"
      src="${albumsObject.cover_xl}"
      alt="img" 
    />
  </div>
  <div class="ms-3 d-flex flex-column text-white">
    <p class="mb-0 text-white">${albumsObject.title}</p>
    <p class="mb-0 text-white">${albumsObject.artist.name}</p>
  </div>
`;

    divNavbarCards.appendChild(divNavbarCard);
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
    currentAlbumIndex = (currentAlbumIndex + 1) % albumsObjects.length;
    playAlbum(albumsObjects[currentAlbumIndex]);
}

// Funzione per passare alla canzone precedente
function previousSong() {
    currentAlbumIndex =
        (currentAlbumIndex - 1 + albumsObjects.length) % albumsObjects.length;
    playAlbum(albumsObjects[currentAlbumIndex]);
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