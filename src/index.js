// Importing all necessary functions:

import { search, fetchDataComplete, pokemonFetch } from "./modules/network.mjs";

// Defining variables if necessary and executing functions:

async function main() {
  const searchBar = document.getElementById("searchbar");
  const dataArray = await fetchDataComplete();
  pokemonFetch(dataArray);
  searchBar.addEventListener("keyup", (e) => search(e.target.value, dataArray));
}

main();
