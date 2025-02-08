// Fetch Functions for API
import { createCard } from "./ui.mjs";

const mainSRC = "https://pokeapi.co/api/v2/pokemon";
const error = document.getElementById("errorbar");
const listContainer = document.getElementById("content-container");
const uniquePokemon = new Set();

export async function search(value, dataArray) {
  //  real-time search -> only searches when key is lifted
  let userSearch = value.trim();
  uniquePokemon.clear();
  listContainer.innerHTML = ""; // Clear previous results

  // If input is empty, reload all Pokémon
  if (userSearch === "") {
    error.innerHTML = "";
    listContainer.innerHTML = "";
    uniquePokemon.clear();
    pokemonFetch();
    return;
  }

  // ID Search
  if (!isNaN(userSearch)) {
    const poke_no = parseInt(userSearch, 10);
    if (!uniquePokemon.has(poke_no)) {
      uniquePokemon.add(poke_no);
      matchByID(poke_no, dataArray);
      return;
    }
  }

  // Multiple IDs -> Multiple IDs passed to fetchDataFromSearchID
  else if (userSearch.split(",").every((i) => !isNaN(Number(i.trim())))) {
    const poke_no_list = userSearch
      .split(",")
      .map((i) => Number(i.trim()))
      .filter((num) => !isNaN(num));

    poke_no_list.forEach((poke_no) => {
      if (!uniquePokemon.has(poke_no)) {
        uniquePokemon.add(poke_no);
        matchByID(poke_no, dataArray);
        return;
      }
    });
  }

  // Name Search -> "matchByName"
  else {
    userSearch = userSearch.toLowerCase();

    const matchingPokemon = dataArray.filter((pokemon) =>
      pokemon.name.includes(userSearch)
    );
    console.log(matchingPokemon);
    if (matchingPokemon.length === 0) {
      error.innerHTML = "No matching Pokémon found!";
    } else {
      error.innerHTML = "";
      displayMatchingPokemonCards(matchingPokemon, uniquePokemon);
    }
  }
}

// Search Pokémon and match by ID; used for search!
export async function matchByID(poke_no, data) {
  data.find((pokemon) => {
    if (String(pokemon.id).includes(poke_no)) {
      createCard(pokemon);
    }
  });
}

// Search Pokémon and match by name; used for search!
// function matchByName(query, data) {
//   return data.results.filter((pokemon) => pokemon.name.includes(query));
// }

// Fetch and display unique Pokémon cards; used for search!
async function displayMatchingPokemonCards(pokemonList, uniquePokemon) {
  listContainer.innerHTML = ""; // Clear previous results
  if (pokemonList.length > 1) {
    for (const pokemon of pokemonList) {
      if (uniquePokemon.has(pokemon.id)) {
        createCard(pokemon);
      } else {
        // Prevent duplicates
        uniquePokemon.add(pokemon.id);
        createCard(pokemon);
      }
    }

    if (pokemonList.length === 1) {
      if (uniquePokemon.has(pokemonList.id)) {
        createCard(pokemonList);
      } else {
        // Prevent duplicates
        uniquePokemon.add(pokemonList.id);
        createCard(pokemonList);
      }
    }
  }
}

// Main Card creation function
export function pokemonFetch(dataArray) {
  dataArray.forEach((pokemon) => createCard(pokemon));
}

// Pokemon fetch; length sets the number of pokemon; data used everywhere!
export async function fetchDataComplete() {
  try {
    const length = 150;

    const res = await Promise.all(
      Array.from({ length }, (_, i) =>
        fetch(`${mainSRC}/${i + 1}`)
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null)
      )
    );

    const dataArray = res.filter(Boolean);
    console.log(dataArray);
    return dataArray;
  } catch (error) {
    console.error(error);
  }
}
