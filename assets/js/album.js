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
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const apiAlbum =
  "https://corsproxy.io/?https://striveschool-api.herokuapp.com/api/deezer/album/";
const apiBaseURL = "https://striveschool-api.herokuapp.com/api/deezer/";

let item;
window.addEventListener("load", init);
async function init() {
  await Promise.all([
    loadAlbums(albums, divCanzoni, albumsObjects),
    loadAlbums(albums2, divCanzoni2, albumsObjects2),
    loadAlbums(albums3, divCanzoni3, albumsObjects3),
    loadMiniCards(),
    loadNavbarCards(),
    loadDetailsAlbum(),
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

async function loadAlbums(albumsArray, destinationDiv, albumsObjectsArray) {
  try {
    for (let i = 0; i < albumsArray.length; i++) {
      const response = await fetch(apiAlbum + albumsArray[i]);
      const itemProva = await response.json();
      albumsObjectsArray.push(itemProva);
    }
    displayAlbumCard(albumsObjectsArray, destinationDiv);
    console.log(albumsObjectsArray);
    console.log(albumsObjectsArray[0].tracks.data[0].preview);
  } catch (error) {
    console.log(error);
  }
}

function displayAlbumCard(albumsObjectsArray, destinationDiv) {
  albumsObjectsArray.forEach((albumsObject) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `<div class="me-3 rounded-2 p-3 h-100 cardhover">
            <div class="card position-relative bg-transparent border-0" style="width: 12rem">
                <img onclick="gotoAlbumPage(${albumsObject.id})" src="${albumsObject.cover_xl}" class="card-img-top" alt="..." />
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
    btnPlay.addEventListener("click", () => playAlbum(albumsObject));
    destinationDiv.appendChild(cardDiv);
  });
}
function gotoAlbumPage(id) {
  window.location.href = `cerca.html?id=${id}`;
}

function playAlbum(album) {
  const trackUrl = album.tracks.data[0].preview;
  if (trackUrl) {
    playAudio(trackUrl);
  } else {
    console.error("Track preview not available");
  }
}

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

function nextSong() {
  currentAlbumIndex = (currentAlbumIndex + 1) % albumsObjects.length;
  playAlbum(albumsObjects[currentAlbumIndex]);
}

function previousSong() {
  currentAlbumIndex =
    (currentAlbumIndex - 1 + albumsObjects.length) % albumsObjects.length;
  playAlbum(albumsObjects[currentAlbumIndex]);
}

document.getElementById("play").addEventListener("click", togglePlay);
document.getElementById("forward").addEventListener("click", nextSong);
document.getElementById("backward").addEventListener("click", previousSong);

async function searchDeezer() {
  const query = document.getElementById("search-input").value;
  fetch(`${apiBaseURL}search?q=${query}`)
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
  fetch(`${apiBaseURL}track/${trackId}`)
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

// parte popolamento mini cards
const divMiniCards = document.getElementById("mini-cards");

async function loadMiniCards() {
  try {
    for (let i = 0; i < albums4.length; i++) {
      const response = await fetch(apiAlbum + albums4[i]);
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
    divCard.classList.add("col-3");
    divCard.innerHTML = `
  <div class="d-flex flex-row cardhover p-0 position-relative">
    <div class="d-flex align-items-center ">
      <img width="47" src="${albumsObject.cover_xl}" alt="img" />
      <button class="btnPlay position-absolute end-0 btn btn-success rounded-5"><i class="bi bi-play-fill"></i></button>
      <div class="ms-3 d-flex flex-column text-white">
        <p class="mb-0">${albumsObject.title}</p>
      </div>
    </div>
  </div>
`;
    const btnPlay = divCard.querySelector(".btnPlay");
    btnPlay.addEventListener("click", () => playAlbum(albumsObject));
    divMiniCards.appendChild(divCard);
  });
}

// navbar cards

const divNavbarCards = document.getElementById("navbarCards");

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

// <div class="d-flex flex-row ms-3 my-3">
//   <div class="d-flex align-items-center">
//     <img
//       width="47"
//       class="rounded-5"
//       src="assets/imgs/main/image-16.jpg"
//       alt="img"
//     />
//   </div>
//   <div class="ms-3 d-flex flex-column text-white">
//     <p class="mb-0">50 cent</p>
//     <p class="mb-0">Artista</p>
//   </div>
// </div>;

// parte params

const params = new URLSearchParams(location.search);
const id = params.get("id"); //ottengo l'id della pagina
console.log(id);

let albumDetails = {};
const loadDetailsAlbum = async () => {
  try {
    const response = await fetch(apiAlbum + id);
    albumDetails = await response.json();
    console.log(albumDetails);
    displayAlbumDetails();
  } catch (error) {
    console.log(error);
  }
};
const posterContainer = document.getElementById("poster-container");
function displayAlbumDetails() {
  posterContainer.innerHTML = `
        <div id="coverTestata" class="col-2 px-0">
            <div>
                <img src="${
                  albumDetails.cover_xl
                }" class="img-fluid rounded-1" alt="">
            </div>
        </div>
        <div id="contenitoreTesto" class="col-9 text-white">
            <div class="d-flex flex-column">
                <p class="m-0">Album</p>
                <h1 class="m-0 display-1 fw-bold">${albumDetails.title}</h1>
                <div class="d-flex flex-row align-items-center gap-1">
                    <img src="${
                      albumDetails.artist.picture
                    }" style="width: 20px;" alt="" class="rounded-5">
                    <p class="m-0">${
                      albumDetails.artist.name
                    } • ${albumDetails.release_date.slice(0, 4)} • ${
    albumDetails.nb_tracks
  } brani, ${converti(albumDetails.duration)}
</p>
                </div>
            </div>
        </div>
    `;
}
function converti(duration) {
  return `${Math.floor(duration / 60)} min ${Math.ceil(duration % 60)} sec.`;
}

{
  /* <div id="coverTestata" class="col-2 px-0 ">
                              <div>
                                  <img src="assets/imgs/main/image-12.jpg" class="img-fluid rounded-1" alt="">
                              </div>
                          </div>
                          <div id="contenitoreTesto" class="col-9 text-white">
                              <div class="d-flex flex-column">
                                  <p class="m-0">Album</p>
                                  <h1 class="m-0 display-1 fw-bold">Nome</h1>
                                  <div class="d-flex flex-row align-items-center gap-1">
                                      <img src="assets/imgs/main/image-1.jpg" style="width: 20px;" alt="">
                                      <p class="m-0">Calcutta • 2023 • 11 brani, 35 min 56 sec. </p>
  
                                  </div>
                              </div>
                          </div> */
}
