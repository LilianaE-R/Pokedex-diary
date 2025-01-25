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
    height: data.height,
    weight: data.weight,
    ability1: data.abilities[0].ability.name,
    ability2: data.abilities[1].ability.name,
    stat1Name: data.stats[0].stat.name,
    stat1Value: data.stats[0].base_stat,
    stat2Name: data.stats[1].stat.name,
    stat2Value: data.stats[1].base_stat,
    stat3Name: data.stats[2].stat.name,
    stat3Value: data.stats[2].base_stat,
    stat4Name: data.stats[3].stat.name,
    stat4Value: data.stats[3].base_stat,
    stat5Name: data.stats[4].stat.name,
    stat5Value: data.stats[4].base_stat,
    stat6Name: data.stats[5].stat.name,
    stat6Value: data.stats[5].base_stat,
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
  }
}
