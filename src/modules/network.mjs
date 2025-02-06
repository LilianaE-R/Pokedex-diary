// Fetch Functions for API
import { createCard } from "./ui.mjs";

const mainSRC = "https://pokeapi.co/api/v2/pokemon";
const error = document.getElementById("errorbar");
const searchBar = document.getElementById("searchbar");
const listContainer = document.getElementById("content-container");

export function search(search) {
  if (!isNaN(search) && search.trim() !== "") {
    searchById(search.trim());
  } else if (search.includes(",")) {
    let ids = search
      .split(",")
      .map((id) => id.trim())
      .filter((id) => !isNaN(id));
    ids.forEach((id) => searchById(id));
  } else {
    console.log("Insert a value");
  }
}

function searchById(searchID, dataArray) {
  dataArray.find((pokemon) =>
    pokemon.id == searchID
      ? createCard(searchID)
      : (error.textContent = "Insert sth")
  );
}

export function pokemonFetch(dataArray) {
  dataArray.forEach((pokemon) => createCard(pokemon));
}

export async function fetchDataComplete() {
  try {
    // First catching the true pokemon count (beta!)
    const firstFetch = await fetch(mainSRC);
    const dataLength = await firstFetch.json();
    const length = dataLength.count - 279;

    const len = 10;
    // Start to use of real "length"
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
