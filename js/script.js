const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "ce5bd51b";
const APP_key = "b23402c1b8c87e67ac5c5b0e22450697";



// console.log(container)





searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=12`;
  const response = await fetch(baseURL);
  const dados = await response.json();
  generateHTML(dados.hits);
  console.log(dados);
}

function generateHTML(results) {
  container.classList.remove("inicial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-dados">Calories: ${result.recipe.calories.toFixed(2)}</p>
        
        }</p>
        
      </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}