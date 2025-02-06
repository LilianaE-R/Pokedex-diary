// Importing all necessary functions:

import { search, fetchDataComplete, pokemonFetch } from "./modules/network.mjs";

// Executing functions:
const searchBar = document.getElementById("searchbar");
const listContainer = document.getElementById("content-container");

// fetchDataComplete().then((data) => {});

async function main() {
  const dataArray = await fetchDataComplete();
  pokemonFetch(dataArray);
  searchBar.addEventListener("input", (e) => search(e.target.value, dataArray));
}

main();
