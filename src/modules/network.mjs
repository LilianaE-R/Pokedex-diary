// Fetch Functions for API

import { createCard } from "./ui.mjs";

export const mainSRC = "https://pokeapi.co/api/v2/pokemon";
const error = document.getElementById("errorbar");

export function searchBar() {
  const searchBar = document.getElementById("searchbar");
  const uniqueNum = new Set();
  const listContainer = document.getElementById("content-container");

  searchBar.addEventListener("input", () => {
    listContainer.innerHTML = "";
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
    errorbar.innerHTML = "";
    createCard(data);
  } catch (e) {
    console.error(e);
    console.error(`Error at index ${poke_no}: `, e);
    errorbar.innerHTML = "Pokemon does not exist!";
  }
}

// fetch-cycle for search by ID
export async function fetchDataFromSearchName(poke_name) {
  try {
    const res = await fetch(`${mainSRC}/${poke_name}`);
    if (!res.ok) throw new Error("Something went wrong");
    const data = await res.json();
    console.log(
      `That worked: It is Pokemon No: ${data.id} with the name ${data.name}`
    );
    errorbar.innerHTML = "";
    createCard(data);
  } catch (e) {
    console.error(e);
    console.error(`Error at index ${poke_name}: `, e);
    errorbar.innerHTML = "Pokemon does not exist!";
  }
}

export async function fetchDataComplete() {
  const length = 150;
  try {
    const res = await Promise.all(
      Array.from({ length }, (_, i) =>
        fetch(`${mainSRC}/${i + 1}`)
          .then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch ${i + 1}`);
            return res.json();
          })
          .then((data) => {
            console.log(`That worked: Pokemon No ${i + 1}`, data);
            errorbar.innerHTML = "";
            createCard(data);
            return data;
          })
          .catch((e) => {
            console.error(`Error at index ${i + 1}:`, e);
            return null;
          })
      )
    );
  } catch (e) {
    console.error("Something went wrong:", e);
  }
}
