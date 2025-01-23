//FAVOURITES
const favouritesStorageBtn = document.getElementById('add-favourites-localstorage');
favouritesStorageBtn.addEventListener('click', () => {
storeFavourites();
});

export function storeFavourites(data) {
    // Get previous data OR an empty array
    const previousData = JSON.parse(localStorage.getItem('Favourites')) || [];
    //variable with pokemon data
    const pokemonListLocal = { id: data.id, name: data.name, note: "" };
    // Set item to a stringified version of an array with the old and new tasks
    localStorage.setItem('Favourites', JSON.stringify([...previousData, pokemonListLocal]));
};


//this should be used together with card creation
function pullFavourites() {
    const favouritesStorage = localStorage.getItem('Favourites');
    const favourites = JSON.parse(favouritesStorage);
    createLocalCard(favourites);
};

createLocalCard () // Micha's code


//NOTES
const noteInput = document.getElementById('note-input');
const notesStorageBtn = document.getElementById('add-notes-localstorage');
 //the click event should happen right after the button for notes is created
notesStorageBtn.addEventListener('click', () => {
    addToNotes(notes)});

function addToNotes(notes) {
        const note = noteInput.value.trim();
        if (note) {
            noteInput.value ='';
            noteInput.focus();
        } else {
            alert ('You cannot submit an empty note')
        }
        const previousData = JSON.parse(localStorage.getItem('Notes')) || [];
        const noteLocal = { id: data.id, name: data.name, note: note};
        localStorage.setItem('Notes', JSON.stringify([...previousData, noteLocal]));
    };