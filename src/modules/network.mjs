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

  export async function fetchData() {
    const length = 1000;

    const res = await Promise.all(
      Array.from({ length }, (_, i) =>
        fetch(`${mainSRC}/${i + 1}`)
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null)
      )
    );
    const dataArray = res.filter(Boolean);
    console.log(dataArray);
    dataArray.forEach((pokemon) => {
      createCard(pokemon);
    });
    return dataArray;
  }
}

// export function searchBar() {
//   const searchBar = document.getElementById("searchbar");
//   const uniqueNum = new Set();
//   const listContainer = document.getElementById("content-container");

//   searchBar.addEventListener("input", () => {
//     listContainer.innerHTML = "";
//     const userSearch = searchBar.value.trim();
//     // Single No Input
//     if (!isNaN(userSearch)) {
//       const poke_no = parseInt(userSearch, 10);
//       if (!uniqueNum.has(poke_no)) {
//         uniqueNum.add(poke_no);
//         // Fetch-Single-Start
//         fetchDataComplete.searchById(poke_no);
//       }
//       // Multi No Input
//     } else if (userSearch.split(",").every((i) => !isNaN(Number(i.trim())))) {
//       const poke_no = userSearch
//         .split(",")
//         .map((i) => Number(i.trim()))
//         .filter((num) => !isNaN(num));
//       // Fetch-Multi-Start
//       poke_no.forEach((i) => {
//         if (!uniqueNum.has(i)) {
//           uniqueNum.add(i);
//           fetchDataComplete.searchById(i);
//         }
//       });
//     } else {
//       const poke_name = userSearch;
//       fetchDataFromSearchName(poke_name);
//     }
//   });
// }
