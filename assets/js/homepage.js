const apiPrincipale =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const apiAlbum =
  "https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}";


let item;
window.addEventListener("load", init);
async function init() {
  await loadProducts();
}

const loadProducts = async () => {
  try {
    const response = await fetch(apiPrincipale + "madame")
   item = await response.json();

      console.log(item)
          displayItem();
  } catch (error) {
    console.log(error);
  }
};


function displayItem() {
  for (let i = 0; i < item.data.length; i++) {
    let colCard = document.createElement("div");
    colCard.classList.add("col-4");
    colCard.innerHTML = `<div class="card h-100 d-flex flex-column" style="width: 18rem;">
    
  <img src="${productsList[i].imageUrl}" class="card-img-top img-fluid alt="...">
  <div class="card-body">
    <h5 class="card-title">${productsList[i].name}</h5>
    <p class="card-text">${productsList[i].description}</p>
    <a href="./form.html?id=${productsList[i]._id}" class="btn btn-warning">Modifica</a>
    <a href="./details.html?id=${productsList[i]._id}" class="btn btn-primary">Scopri di più</a>
  </div>
  
</div>`;
    mainRow.appendChild(colCard);
  }
}

  // https://striveschool-api.herokuapp.com/api/deezer/

  // https://striveschool-api.herokuapp.com/api/deezer/search?q=

  // https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}

  