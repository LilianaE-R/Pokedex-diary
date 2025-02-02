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
        type: data.types[0].type.name,
        note: "",
        pic: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        ability1: data.abilities[0].ability.name,
        // ability2: data.abilities[1].ability.name,
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
    // Set item to a stringified version of an array with the old and new tasks
    localStorage.setItem("Favourites", JSON.stringify([...previousData, pokemonListLocal]));
    // Change Favorite Button
    const e = document.getElementById(data.id);
    const parent = e.parentElement;
    e.remove();
    const rmBtn = document.createElement("button");
    rmBtn.className = "bg-red-500 p-1 rounded-lg outline-1 text-white text-md transition delay-100 duration-100 ease-in-out hover:scale-105 hover:bg-rose-500";
    rmBtn.textContent = "Remove to Favorites";
    rmBtn.id = data.id;
    rmBtn.addEventListener("click", () => removeFavorites(data));
    parent.prepend(rmBtn);
}

export function removeFavorites(data) {
    // Get previous data OR an empty array
    const storage = JSON.parse(localStorage.getItem("Favourites")) || [];
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === data.id) {
            storage.splice(i, 1);
            localStorage.setItem("Favourites", JSON.stringify(storage));
        }
    }
    // Change Button
    const e = document.getElementById(data.id);
    const parent = e.parentElement;
    e.remove();
    const saveBtn = document.createElement("button");
    saveBtn.className = "bg-blue-500 p-1 rounded-lg outline-1 text-white text-md transition delay-100 duration-100 ease-in-out hover:scale-105 hover:bg-indigo-500";
    saveBtn.textContent = "Add to Favorites";
    saveBtn.id = data.id;
    saveBtn.addEventListener("click", () => storeFavourites(data));
    parent.prepend(saveBtn);
}

// Pull Favorites from Local Storage
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
