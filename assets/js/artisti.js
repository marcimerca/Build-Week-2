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
const apiPrincipale =
  "https://corsproxy.io/?https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const apiAuthor =
  "https://corsproxy.io/?https://deezerdevs-deezer.p.rapidapi.com/artist/";
const proxy = "https://corsproxy.io/?";
// navbar cards

window.addEventListener("load", init);
async function init() {
  await loadNavbarCards();
  await loadArtistDetails();
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
    // console.log(albumsObjects5);
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

// parte params

const params = new URLSearchParams(location.search);
const nameArtist = params.get("name"); //ottengo il nome dell'artista
console.log(nameArtist);

let artistDetails = {};
let tracksList = [];
let tracksDetails = [];
const loadArtistDetails = async () => {
  try {
    const response = await fetch(apiPrincipale + nameArtist, {
      headers: {
        "X-RapidAPI-Key": "828e7fcfe3mshe4aae5ec5cd4aa8p194e34jsnce9825cd925e",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });
    artistDetails = await response.json();

    if (artistDetails.data.length > 0) {
      const idArtista = artistDetails.data[0].artist.id;

      const fetchArtista = await fetch(apiAuthor + idArtista, {
        headers: {
          "X-RapidAPI-Key":
            "828e7fcfe3mshe4aae5ec5cd4aa8p194e34jsnce9825cd925e",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      });
      artistDetails = await fetchArtista.json();
      console.log(artistDetails);

      // Esegui la richiesta fetchTracks solo dopo che fetchArtista è stata completata con successo
      const fetchTracks = await fetch(proxy + artistDetails.tracklist, {
        headers: {
          "X-RapidAPI-Key":
            "828e7fcfe3mshe4aae5ec5cd4aa8p194e34jsnce9825cd925e",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      });
      const objectTracks = await fetchTracks.json();
      tracksDetails = objectTracks.data;
      console.log(tracksDetails);
      displayArtistDetails();
      // displayAlbumsDetails();
    }
  } catch (error) {
    console.log(error);
  }
};
const inputCerca = document.getElementById("inputCerca");
const btnCercaArtista = document.getElementById("cercaArtista");
btnCercaArtista.addEventListener("click", redirectToPage);
function redirectToPage() {
  window.location.href = `artisti.html?name=${inputCerca.value}`;
}
contenitoreTracks = document.getElementById("contenitore-tracks");
function displayArtistDetails() {
  const firstFiveTracks = tracksDetails.slice(0, 5);
  firstFiveTracks.forEach((track, index) => {
    const singleTrackContainer = document.createElement("div");
    singleTrackContainer.classList.add("d-flex", "flex-column", "text-white");
    singleTrackContainer.innerHTML = `<div
                    class="d-flex flex-row ps-3 justify-content-between comparsa rounded-1 mb-3">
                    <div class="d-flex flex-row gap-4 align-items-center">
                      <div style="width:20px">${index + 1}</div>
                      <div class="p-2"> <img class="rounded-1" style="width:50px;" src="${track.album.cover_small
      }"" > </div>
                      <div class="d-flex flex-column align-items-start">
                      <p class="m-0">${track.title}</p>
                      <p class="m-0">${track.artist.name}</p>
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
}

function converti(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.ceil(duration % 60);

  if (minutes >= 10) {
    if (seconds < 10) {
      return ` ${minutes} min 0${seconds} sec.`;
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


//ALBUM

// const contenitoreAlbum = document.getElementById('container-album');


// function displayAlbumsDetails() {
//   const firstFiveTracks = tracksDetails.slice(0, 5);
//   firstFiveTracks.forEach((track, index) => {
//     const singleTrackContainer = document.createElement("div");
//     singleTrackContainer.classList.add("d-flex", "flex-column", "text-white");
//     singleTrackContainer.innerHTML = `<div
//                     class="d-flex flex-row ps-3 justify-content-between comparsa rounded-1 mb-3">
//                     <div class="d-flex flex-row gap-4 align-items-center">
//                       <div style="width:20px">${index + 1}</div>
//                       <div class="p-2"> <img class="rounded-1" style="width:50px;" src="${track.album.cover_small
//       }"" > </div>
//                       <div class="d-flex flex-column align-items-start">
//                       <p class="m-0">${track.title}</p>
//                       <p class="m-0">${track.artist.name}</p>
//                       </div>
//                     </div>
//                     <div class="d-flex gap-3 me-2 align-items-center">
//                       <div><i class="bi bi-heart"></i></div>
//                       <div>${converti(track.duration)}</div>
//                       <div><i class="bi bi-three-dots"></i></div>
//                     </div>
//                   </div>`;
//     contenitoreAlbum.appendChild(singleTrackContainer);
//   });
// }





// const arrayAlbums = tracksDetails.filter(album => {
//   album.album
// })

// console.log(arrayAlbums)

// function displayAlbumCard() {
//   albumsObjectsArray.forEach((albumsObject) => {
//     const cardDiv = document.createElement("div");
//     cardDiv.innerHTML =
//       `<div class="me-3 rounded-2 p-3 h-100 cardhover">
//           <div class="card position-relative bg-transparent border-0" style="width: 12rem">
//               <img onclick="gotoAlbumPage(${albumsObject.id})" src="${albumsObject.cover_xl}" class="card-img-top" alt="..." />
//               <button class="btnPlay position-absolute top-0 end-0 btn btn-success rounded-5"><i class="bi bi-play-fill"></i></button>
//               <div class="card-body">
//                   <h5 class="text-white">${albumsObject.title}</h5>
//                   <p class="card-text text-white">
//                       ${albumsObject.artist.name}
//                   </p>
//               </div>
//           </div>
//       </div>`;

//     const btnPlay = cardDiv.querySelector(".btnPlay");
//     btnPlay.addEventListener("click", () => playAlbum(albumsObject, numero));
//     destinationDiv.appendChild(cardDiv);
//   });
// }