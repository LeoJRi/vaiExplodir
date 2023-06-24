function fetchPokemonData() {
  fetch("https://pokeapi.co/api/v2/pokemon")
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao obter dados da API.");
      }
    })
    .then(function(data) {
      pokemonData = data.results;
      displayPokemonList(pokemonData);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function displayPokemonList(pokemonList) {
  var pokemonListContainer = document.getElementById("pokemon-list");
  pokemonListContainer.innerHTML = "";

  pokemonList.forEach(function(pokemon) {
    var pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.innerHTML = `
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png" alt="${pokemon.name}" class="pokemon-image">
      <div class="pokemon-name">${pokemon.name}</div>
    `;

    pokemonCard.addEventListener("click", function() {
      getPokemonDetails(pokemon);
    });

    pokemonListContainer.appendChild(pokemonCard);
  });
}

function getPokemonId(url) {
  var regex = /\/pokemon\/(\d+)\//;
  var matches = url.match(regex);
  return matches[1];
}

function getPokemonDetails(pokemon) {
  fetch(pokemon.url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao obter dados da API.");
      }
    })
    .then(function(data) {
      displayPokemonDetails(data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function displayPokemonDetails(pokemon) {
  var pokemonListContainer = document.getElementById("pokemon-list");
  var pokemonDetailsContainer = document.getElementById("pokemon-details");

  pokemonListContainer.style.display = "none";
  pokemonDetailsContainer.innerHTML = `
    <div id="pokemon-css">
      <h2>${pokemon.name}</h2>
      <div class='pokemon-content'>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}" class="pokemon-image">
        <div><span class="info-label">Height:</span> <span class="info-value">${pokemon.height}</span></div>
        <div><span class="info-label">Weight:</span> <span class="info-value">${pokemon.weight}</span></div>
        <div><span class="info-label">Abilities:</span> <span class="info-value">${pokemon.abilities.map(ability => ability.ability.name).join(", ")}</span></div>
        <div><span class="info-label">Types:</span> <span class="info-value">${pokemon.types.map(type => type.type.name).join(", ")}</span></div>
        <button class='custom-button' onClick="window.location.reload();">Refresh Page</button>
      </div>
    </div>
  `;
}

var searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function(event) {
  var searchTerm = event.target.value;
  filterPokemonByName(searchTerm);
});

function filterPokemonByName(searchTerm) {
  var filteredPokemon = pokemonData.filter(function(pokemon) {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  displayPokemonList(filteredPokemon);
}

var pokemonData = [];

fetchPokemonData();