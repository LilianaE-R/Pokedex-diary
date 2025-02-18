// Local Storage Functions
import { removeStorageBtn, createStorageBtn, createFavoriteCard } from "./ui.mjs";

//FAVOURITES to LS
export function storeFavourites(data) {
    // Get previous data OR an empty array
    const previousData = JSON.parse(localStorage.getItem("Favourites")) || [];

    //variable with pokemon data
    const pokemonListLocal = {
        id: data.id,
        name: data.name,
        type1: getPokemonType(data, 0),
        type2: getPokemonType(data, 1),
        note: "",
        pic: data.sprites.other["official-artwork"].front_default,
        height: data.height,
        weight: data.weight,
        ability1: data.abilities[0].ability.name,
        ability2: data.abilities.length > 1 ? data.abilities[1].ability.name : "",
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
    const parentElement = removeStorageBtn(data.id);
    createStorageBtn(data, parentElement, "Remove");
}

//
export function getPokemonType(data, num) {
    if (num === 1 && data.types.length > 1) {
        return data.types[1].type.name;
    } else {
        return data.types[0].type.name;
    }
}

// Remove stored Pokemon
export function removeFavorite(data) {
    const storage = JSON.parse(localStorage.getItem("Favourites")) || [];
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === data.id) {
            storage.splice(i, 1);
            localStorage.setItem("Favourites", JSON.stringify(storage));
        }
    }
    const parentElement = removeStorageBtn(data.id);
    createStorageBtn(data, parentElement, "Add to Favorites");
}

// Check if Pokemon in storage
export function checkStorage(id) {
    const storage = JSON.parse(localStorage.getItem("Favourites")) || [];
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === id) {
            return true;
        } else {
        }
    }
    return false;
}

// Pull Favorites from Local Storage
export function pullFavourites() {
    const favouritesStorage = localStorage.getItem("Favourites");
    const favourites = JSON.parse(favouritesStorage);
    createFavoriteCard(favourites);
}

// NOTES adding
export function addNotesToStorage(note, pokeID) {
    const favouritesLS = JSON.parse(localStorage.getItem("Favourites")) || [];
    for (let i = 0; i < favouritesLS.length; i++) {
        if (favouritesLS[i].id == pokeID) {
            favouritesLS[i].note = typeof note === "object" ? "" : note;
            localStorage.setItem("Favourites", JSON.stringify(favouritesLS));
        }
    }
}
