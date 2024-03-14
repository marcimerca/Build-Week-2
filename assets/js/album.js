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
  await loadNavbarCards();
  await loadDetailsAlbum();
}

let albumsObjects5 = [];

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

// parte params

const params = new URLSearchParams(location.search);
const id = params.get("id"); //ottengo l'id della pagina
console.log(id);

let albumDetails = {};
let tracksList = [];
const loadDetailsAlbum = async () => {
  try {
    const response = await fetch(apiAlbum + id);
    albumDetails = await response.json();
    tracksList = albumDetails.tracks.data;
    console.log(tracksList);
    console.log(albumDetails);
    displayAlbumDetails();
  } catch (error) {
    console.log(error);
  }
};
const posterContainer = document.getElementById("poster-container");
const contenitoreTracks = document.getElementById("contenitore-tracks");
const finalDetails = document.getElementById("final-details");
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

  tracksList.forEach((track, index) => {
    const singleTrackContainer = document.createElement("div");
    singleTrackContainer.classList.add("d-flex", "flex-column", "text-white");
    singleTrackContainer.innerHTML = `<div
                    class="d-flex flex-row ps-3 justify-content-between comparsa rounded-1 mb-3">
                    <div class="d-flex flex-row gap-4 align-items-center">
                      <div style="width:20px">${index + 1}</div>
                      <div class="d-flex flex-column align-items-start">
                      <p class="m-0">${track.title}</p>
                      <p class="m-0">${albumDetails.artist.name}</p>
                      </div>
                    </div>
                    <div class="d-flex gap-3 me-2 align-items-center">
                      <div><i class="bi bi-heart"></i></div>
                      <div>${converti(track.duration)}</div>
                      <div><i class="bi bi-three-dots"></i></div>
                    </div>
                  </div>`;
    contenitoreTracks.appendChild(singleTrackContainer);
  });
  finalDetails.innerHTML = `<p class="m-0">${convertiData(
    albumDetails.release_date
  )}</p>
              <p class="m-0">&copy;${albumDetails.label} </p>`;
}
function converti(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.ceil(duration % 60);

  if (minutes >= 10) {
    if (seconds < 10) {
      return `${minutes} min 0${seconds} sec.`;
    } else {
      return `${minutes} min ${seconds} sec.`;
    }
  } else {
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  }
}

function convertiData(inputDate) {
  let dateObject = new Date(inputDate);
  const formattedDate = new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObject);

  return formattedDate;
}

// {

//             <div class="d-flex justify-content-between align-items-center">
//               <div class="d-flex align-items-center gap-3">
//                 <button class="btnPlay btn btn-lg btn-success rounded-5">
//                   <i class="bi bi-play-fill"></i>
//                 </button>
//                 <i class="fs-4 linkhover bi bi-heart text-secondary"></i>
//                 <button
//                   class="btn bg-transparent text-white border-0 btn-secondary bi bi-three-dots"
//                   type="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 ></button>
//                 <ul class="dropdown-menu bg-dark">
//                   <li>
//                     <a class="text-white hoverDropdown dropdown-item" href="#"
//                       >Recenti</a
//                     >
//                   </li>
//                   <li>
//                     <a class="text-white hoverDropdown dropdown-item" href="#"
//                       >Aggiunti di recente</a
//                     >
//                   </li>
//                   <li>
//                     <a class="text-white hoverDropdown dropdown-item" href="#"
//                       >Ordine alfabetico</a
//                     >
//                   </li>
//                   <li>
//                     <a class="text-white hoverDropdown dropdown-item" href="#"
//                       >Autore</a
//                     >
//                   </li>
//                 </ul>
//               </div>
//               <div class="text-white d-flex align-items-start gap-2">
//                 <p class="m-0">Elenco</p>
//                 <i class="bi bi-list-ul text-white"></i>
//               </div>
//             </div>
//             <!--contenitore titolo -->
//             <div>
//               <div
//                 class="text-white mb-3 d-flex align-items-center mt-4 justify-content-between border-bottom pb-2 ps-3 border-secondary"
//               >
//                 <div class="d-flex gap-3">
//                   <p class="m-0">#</p>
//                   <p class="m-0">Titolo</p>
//                 </div>
//                 <div>
//                   <i class="bi bi-clock me-5"></i>
//                 </div>
//               </div>
//               <!-- contenitore singola track -->
//               <div class="d-flex flex-column text-white">
//                 <div
//                   class="d-flex flex-row ps-3 justify-content-between align-items-center comparsa rounded-1"
//                 >
//                   <div class="d-flex flex-row gap-4 align-items-center">
//                     <div>1</div>
//                     <div class="d-flex flex-column">
//                       <p class="m-0">Coro</p>
//                       <p class="m-0">Calcutta</p>
//                     </div>
//                   </div>

//                   <div class="d-flex gap-3 me-2">
//                     <div><i class="bi bi-heart"></i></div>
//                     <div>2:27</div>
//                     <div><i class="bi bi-three-dots"></i></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div class="text-white mt-4 fs-7">
//               <p class="m-0">20 ottobre 2023</p>
//               <p class="m-0">&copy; 2023 Bomba Dischi</p>
//             </div>

// }
