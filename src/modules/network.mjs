// Fetch Functions for API
import { createCard } from "./ui.mjs";

const mainSRC = "https://pokeapi.co/api/v2/pokemon";
const error = document.getElementById("errorbar");
const searchBar = document.getElementById("searchbar");
const listContainer = document.getElementById("content-container");
const uniquePokemon = new Set();

export function search(value, dataArray) {
  // Keyup event for real-time search -> only searches when key is lifted
  searchBar.addEventListener("keyup", async () => {
    const userSearch = value.trim().toLowerCase();

    // If input is empty, reload all Pokémon
    if (userSearch === "") {
      error.innerHTML = "";
      listContainer.innerHTML = "";
      uniquePokemon.clear();
      pokemonFetch();
      return;
    }

    listContainer.innerHTML = ""; // Clear previous results
    uniquePokemon.clear();

    // ID Search
    if (!isNaN(userSearch)) {
      const poke_no = parseInt(userSearch, 10);
      if (!uniquePokemon.has(poke_no)) {
        uniquePokemon.add(poke_no);
        fetchDataFromSearchID(poke_no, dataArray);
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
          fetchDataFromSearchID(poke_no, dataArray);
        }
      });
    }
    // Name Search -> "fetchDataAndMatchByName"
    else {
      const matchingPokemon = await fetchDataAndMatchByName(userSearch);
      if (matchingPokemon.length === 0) {
        error.innerHTML = "No matching Pokémon found!";
      } else {
        error.innerHTML = "";
        displayMatchingPokemonCards(matchingPokemon, uniquePokemon);
      }
    }
  });
}

// Fetch Pokémon by ID; used for search!
export async function fetchDataFromSearchID(poke_no, data) {
  data.find((pokemon) => {
    if (String(pokemon.id).includes(poke_no)) {
      createCard(pokemon);
    }
  });
}

// Fetch Pokémon and match by name; used for search!
async function fetchDataAndMatchByName(query) {
  try {
    const res = await fetch(`${mainSRC}?limit=1000`);
    if (!res.ok) throw new Error("Failed to fetch Pokémon list");
    const data = await res.json();

    return data.results.filter((pokemon) => pokemon.name.includes(query));
  } catch (e) {
    console.error("Error fetching Pokémon names:", e);
    return [];
  }
}

// Fetch and display unique Pokémon cards; used for search!
async function displayMatchingPokemonCards(pokemonList, uniquePokemon) {
  const listContainer = document.getElementById("content-container");
  listContainer.innerHTML = ""; // Clear previous results

  for (const pokemon of pokemonList) {
    if (uniquePokemon.has(pokemon.name)) continue; // Prevent duplicates
    uniquePokemon.add(pokemon.name);

    try {
      const res = await fetch(`${mainSRC}/${pokemon.name}`);
      if (!res.ok) throw new Error("Failed to fetch Pokémon data");
      const data = await res.json();
      createCard(data);
    } catch (e) {
      console.error(`Error fetching Pokémon: ${pokemon.name}`, e);
    }
  }
}

// Card creation function
export function pokemonFetch(dataArray) {
  dataArray.forEach((pokemon) => createCard(pokemon));
}

// Pokemon fetch; length sets the number of pokemon
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
