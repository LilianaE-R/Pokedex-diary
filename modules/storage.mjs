// Local Storage Functions

import { createLocalCard } from "./ui.mjs";

//FAVOURITES to LS
export function storeFavourites(data) {
  // Get previous data OR an empty array
  const previousData = JSON.parse(localStorage.getItem("Favourites")) || [];
  //variable with pokemon data
  const pokemonListLocal = {
    id: data.id,
    name: data.name,
    note: "",
    pic: data.sprites.front_default,
  };
  console.log(data.sprites.front_default);
  // Set item to a stringified version of an array with the old and new tasks
  localStorage.setItem(
    "Favourites",
    JSON.stringify([...previousData, pokemonListLocal])
  );
}

//LS Reading
export function pullFavourites() {
  const favouritesStorage = localStorage.getItem("Favourites");
  const favourites = JSON.parse(favouritesStorage);

  createLocalCard(favourites);
}

// NOTES adding

export function addToNotes(note, pokeID) {
  const notes = note.value.trim();

  if (notes) {
    note.focus();
  } else {
    console.error("You cannot submit an empty note");
  }

  const favouritesLS = JSON.parse(localStorage.getItem("Favourites")) || [];
  for (let i = 0; i < favouritesLS.length; i++) {
    console.log(favouritesLS[i]);
    if (favouritesLS[i].id == pokeID) {
      favouritesLS[i].note = notes;
      localStorage.setItem("Favourites", JSON.stringify(favouritesLS));
    }
    break;
  }
}
