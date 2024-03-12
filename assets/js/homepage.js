const albums = [
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
    divCanzoni.innerHTML += `<div class="card  bg-secondary " style="width: 12em">
  <div class="row g-0 d-flex align-items-center">
    <div class="col-4">
      <img  src="${albumsObject.cover_xl}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-8">
      <div class="card-body">
        <p class="card-title text-white m-0 fs-6">${albumsObject.title}</p>
      </div>
    </div>
  </div>
</div>`;
  });
}
const audio = document.getElementById("audio");
audio.setAttribute("src", `${albumsObjects[0].tracks.data[0].preview}`);

// https://striveschool-api.herokuapp.com/api/deezer/

// https://striveschool-api.herokuapp.com/api/deezer/search?q=

// https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}

// const loadProducts = async () => {
//   try {
//     const response = await fetch(apiPrincipale + "madame");
//     item = await response.json();
//     console.log(item.data);
//     displayItem();
//   } catch (error) {
//     console.log(error);
//   }
// };

// function displayItem() {
//   const brano = item.data[1];
//   console.log(brano.album.coversmall);
//   divCanzoni.innerHTML = `<div class="card h-100 d-flex flex-column text-white" style="width: 18rem;">

//   <img src="${brano.album.cover_xl}" class="card-img-top img-fluid alt="...">
//   <div class="card-body">
//     <h5 class="card-title">ciao</h5>
//     <p class="card-text">ciao</p>

//   </div>

// </div>`;
// }
