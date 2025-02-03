// Fetch Functions for API
import { createCard } from "./ui.mjs";

const mainSRC = "https://pokeapi.co/api/v2/pokemon";
const error = document.getElementById("errorbar");
const searchBar = document.getElementById("searchbar");
const listContainer = document.getElementById("content-container");

export const search = function search(e) {
  let search = searchBar.value;

  if (!search) {
    searchBar.placeholder = "Please insert a Poke-ID or Poke-Name.";
    fetchData.complete();
  } else if (!isNaN(search)) {
    fetchData.searchById(search);
  } else if (search.includes(",")) {
    let ids = search
      .split(",")
      .map((no) => no.trim())
      .filter((no) => !isNaN(no));
    ids.forEach((id) => fetchData.searchById(id));
  } else {
    console.log("Insert a value");
  }
};

function searchById(searchID) {
  dataArray.find((pokemon) =>
    pokemon.id == searchID ? createCard(id) : (error.textContent = "Insert sth")
  );
}

export async function fetchData() {
  fetch(mainSRC)
    .then((res) => res.json())
    .then((data) => {
      const length = data.count;
      exportData(length);
    })
    .catch(console.error);

  const res = await Promise.all(
    Array.from({ length }, (_, i) =>
      fetch(`${mainSRC}/${i + 1}`)
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null)
    )
  );

  const dataArray = res.filter(Boolean);
  dataArray.forEach((pokemon) => {
    createCard(pokemon);
  });
}
