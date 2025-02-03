// Importing all necessary functions:

import { search, fetchData } from "./modules/network.mjs";

// Executing functions:
const search = document.getElementById("searchbar");
const listContainer = document.getElementById("content-container");
websiteStart();

function websiteStart() {
  searchBar();
  if (search.value) {
    listContainer.innerHTML = "";
  } else {
    fetchDataComplete();
  }
}
