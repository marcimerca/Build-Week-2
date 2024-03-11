const albums = [
  "5327691",
  "363906907",
  "217489292",
  "359324967",
  "313482367",
  "65373012",
];

const apiPrincipale =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const apiAlbum =
  "https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}";

let item;
window.addEventListener("load", init);
async function init() {
  await loadProducts();
  await loadProducts2();
}

const loadProducts = async () => {
  try {
    const response = await fetch(apiPrincipale + "madame");
    item = await response.json();
    console.log(item.data);
    displayItem();
  } catch (error) {
    console.log(error);
  }
};
const divCanzoni = document.getElementById("canzoni");
function displayItem() {
  const brano = item.data[1];
  console.log(brano.album.coversmall);
  divCanzoni.innerHTML = `<div class="card h-100 d-flex flex-column text-white" style="width: 18rem;">
    
  <img src="${brano.album.cover_xl}" class="card-img-top img-fluid alt="...">
  <div class="card-body">
    <h5 class="card-title">ciao</h5>
    <p class="card-text">ciao</p>
    
  </div>
  
</div>`;
}

const loadProducts2 = async () => {
  try {
    const response = await fetch(apiPrincipale + "madame");
    item = await response.json();
    console.log(item.data);
    displayItem();
  } catch (error) {
    console.log(error);
  }
};

// https://striveschool-api.herokuapp.com/api/deezer/

// https://striveschool-api.herokuapp.com/api/deezer/search?q=

// https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}
