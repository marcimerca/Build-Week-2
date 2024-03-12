const albums = [
  "5327691",
  "363906907",
  "217489292",
  "359324967",
  "324894",
  "65373012"
];
const albums2 = [
  "125958",
  "43681",
  "754485",
  "14781033",
  "502369701",
  "13994766"
];
const albums3 = [
  "333758737",
  "547047802",
  "256224762",
  "556764162",
  "115603002",
  "65373012"
];

const apiPrincipale =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const apiAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const apiBaseURL = "https://striveschool-api.herokuapp.com/api/deezer/";

let item;
window.addEventListener("load", init);
async function init() {
  await Promise.all([loadAlbums(albums, divCanzoni, albumsObjects), loadAlbums(albums2, divCanzoni2, albumsObjects2), loadAlbums(albums3, divCanzoni3, albumsObjects3)]);
}

const divCanzoni = document.getElementById("canzoni");
const divCanzoni2 = document.getElementById("canzoni2");
const divCanzoni3 = document.getElementById("canzoni3");

let albumsObjects = [];
let albumsObjects2 = [];
let albumsObjects3 = [];

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
              <img src="${albumsObject.cover_xl}" class="card-img-top" alt="..." />
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
      btnPlay.addEventListener('click', () => playAlbum(albumsObject));
      destinationDiv.appendChild(cardDiv);
  });
}

function playAlbum(album) {
  const trackUrl = album.tracks.data[0].preview;
  if (trackUrl) {
      playAudio(trackUrl);
  } else {
      console.error('Track preview not available');
  }
}

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

function nextSong() {
  currentAlbumIndex = (currentAlbumIndex + 1) % albumsObjects.length;
  playAlbum(albumsObjects[currentAlbumIndex]);
}

function previousSong() {
  currentAlbumIndex = (currentAlbumIndex - 1 + albumsObjects.length) % albumsObjects.length;
  playAlbum(albumsObjects[currentAlbumIndex]);
}

document.getElementById('play').addEventListener('click', togglePlay);
document.getElementById('forward').addEventListener('click', nextSong);
document.getElementById('backward').addEventListener('click', previousSong);

async function searchDeezer() {
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


  updateProgress();
}
// Funzione per aggiornare la barra di avanzamento
function updateProgress() {
  const progressBar = document.querySelector('.progress');
  const currentTime = currentAudioPlayer.currentTime;
  const duration = currentAudioPlayer.duration;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Aggiorna il tempo corrente nella barra di avanzamento
  const currentTimeElement = document.querySelector('.progress-container span:first-child');
  currentTimeElement.textContent = formatTime(currentTime);

  // Aggiorna il tempo rimanente nella barra di avanzamento
  const remainingTime = duration - currentTime;
  const remainingTimeElement = document.querySelector('.progress-container span:last-child');
  remainingTimeElement.textContent = formatTime(remainingTime);

  // Richiama la funzione nuovamente dopo un breve intervallo
  setTimeout(updateProgress, 500);
}

// Funzione per formattare il tempo in formato mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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

//regolatore volume 
document.addEventListener("DOMContentLoaded", function() {
  let volumeControl = document.getElementById("volumeControl");

  volumeControl.addEventListener("input", function() {
      let volume = volumeControl.value / 100; // Converti il valore in scala da 0 a 1
      if (currentAudioPlayer) {
          currentAudioPlayer.volume = volume; // Imposta il volume dell'audio attualmente in riproduzione
      }
  });
});