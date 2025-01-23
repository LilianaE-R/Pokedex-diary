// Fetch Functions for API

import { createCard } from "./ui.mjs";

export const mainSRC = "https://pokeapi.co/api/v2/pokemon";

export function searchBar() {
  const searchBar = document.getElementById("searchbar");
  const uniqueNum = new Set();

  searchBar.addEventListener("input", () => {
    const userSearch = searchBar.value.trim();
    // Single No Input
    if (!isNaN(userSearch)) {
      const poke_no = parseInt(userSearch, 10);
      if (!uniqueNum.has(poke_no)) {
        uniqueNum.add(poke_no);
        // Fetch-Single-Start
        fetchDataFromSearchID(poke_no);
      }
      // Multi No Input
    } else if (userSearch.split(",").every((i) => !isNaN(Number(i.trim())))) {
      const poke_no = userSearch
        .split(",")
        .map((i) => Number(i.trim()))
        .filter((num) => !isNaN(num));
      // Fetch-Multi-Start
      poke_no.forEach((i) => {
        if (!uniqueNum.has(i)) {
          uniqueNum.add(i);
          fetchDataFromSearchID(i);
        }
      });
    } else {
      const poke_name = userSearch;
      fetchDataFromSearchName(poke_name);
    }
  });
}

// fetch-cycle for search by ID
export async function fetchDataFromSearchID(poke_no) {
  try {
    const res = await fetch(`${mainSRC}/${poke_no}`);
    if (!res.ok) throw new Error("Something went wrong");
    const data = await res.json();
    console.log(`That worked: Pokemon Number ${poke_no}`, data);
    createCard(data);
  } catch (e) {
    console.error(e);
    console.error(`Error at index ${poke_no}: `, e);
    console.error("Pokemon does not exist!");
  }
}

// fetch-cycle for search by ID
export async function fetchDataFromSearchName(poke_name) {
  try {
    const res = await fetch(`${mainSRC}/`);
    if (!res.ok) throw new Error("Something went wrong");
    const data = await res.json();
    for (let i = 0; i < data.result.length; i++) {
      if (data.result[i].name == poke_name) {
        console.log(
          `That worked: It is Pokemon No: ${i + 1} with the name ${
            data.result[i].name
          }`
        );
        break;
      } else {
        console.log("Not found yet!");
      }
    }
    // console.log(data.result.[i].poke_name);
    // createCard(data);
  } catch (e) {
    console.error(e);
    console.error(`Error at index ${poke_name}: `, e);
    console.error("Pokemon does not exist!");
  }
}

// export async function fetchDataIndex() {
//   while (currentIndex <= maxIndex) {
//     try {
//       let i = currentIndex;
//       currentIndex++;
//       const res = await fetch(`${mainSRC}/${currentIndex}`);
//       if (!res.ok) throw new Error("Something went wrong");
//       const data = await res.json();
//       console.log(`That worked: Pokemon No ${currentIndex}`, data);
//       createCard(data);
//     } catch (e) {
//       console.error(e);
//       console.error(`Error at index ${currentIndex}: `, e);
//     }
//   }
// }

// for favorites: reading the LS!
// export async function fetchDataCart(item) {
//   try {
//     const res = await fetch(`${mainSRC}/${item}`);
//     if (!res.ok) throw new Error("Something went wrong");
//     const data = await res.json();
//     console.log(`That worked: Item No ${item}`, data);
//     createCard(data);
//   } catch (e) {
//     console.error(e);
//     console.error(`Error at index ${item}: `, e);
//   }
// }
