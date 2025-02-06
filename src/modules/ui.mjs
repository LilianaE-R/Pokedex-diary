// Create Card and UI Functions
import { storeFavourites, removeFavorite, addNotesToStorage, checkStorage } from "./storage.mjs";

// Create Card Main Page
export function createCard(data) {
    // Container
    const listContainer = document.getElementById("content-container");

    // Card
    const card = document.createElement("li");
    card.classList.add("bg-white", "list-none", "my-2", "p-2", "flex", "flex-col", "rounded-md", "border", "shadow-md");
    card.innerHTML = `
    <img class='mx-auto' src='${data.sprites.front_default}'/>
    <div class="flex gap-2">
    <p class='capitalize'>#${data.id}</p>
    <p class='capitalize'>${data.name}</p>
    </div><p class='capitalize'>${data.types[0].type.name}</p>`;

    // Append
    listContainer.appendChild(card);

    // Check Storage Button
    checkStorage(data.id) ? createStorageBtn(data, card, "Remove") : createStorageBtn(data, card, "Add to Favorites");
}

// Card for Journal HERREEE
export function createLocalCard(favorites) {
    // element-pointer for container and style
    const listContainer = document.getElementById("content-container");

    // Loop for items
    favorites.forEach((data) => {
        // element-creator
        let card = document.createElement("li");
        let noteField = document.createElement("textarea");
        let saveNoteBtn = document.createElement("button");
        let mainCard = document.createElement("div");
        let subCard = document.createElement("div");
        let subCard1 = document.createElement("div");
        let subCard2 = document.createElement("div");
        let subCard3 = document.createElement("div");
        let subCardH2 = document.createElement("h2");
        let editNoteBtn = document.createElement("button");
        let deleteNoteBtn = document.createElement("button");

        // style AND data adding
        subCard.className = "bg-white rounded-md flex gap-6 p-2";
        subCardH2.textContent = "Type below your note:";
        subCard2.className = "flex flex-col";
        subCard1.innerHTML = `<div>
                            <div class="flex gap-2 mb-2">
                                <p>Height: ${data.height}</p>
                                <p>|</p>
                                <p>Weight: ${data.weight}</p>
                            </div>
                            <div class="mb-2">
                                <h2 class="text-md">Abilities:</h2>
                                <p class="text-sm capitalize">${data.ability1}</p>
                                <p class="text-sm capitalize">${data.ability2}</p>
                            </div>
                            <div class="flex flex-col gap-1 mb-2">
                            <h2 class="text-md">Stats:</h2>
                            <div class="flex gap-6">
                                <div>
                                    <p class="text-sm capitalize">${data.stat1Name}: ${data.stat1Value}</p>
                                    <p class="text-sm capitalize">${data.stat2Name}: ${data.stat2Value}</p>
                                    <p class="text-sm capitalize">${data.stat3Name}: ${data.stat3Value}</p>
                                    </div>
                                   

                                    <div>
                                     <p class="text-sm capitalize">${data.stat4Name}: ${data.stat4Value}</p>
                                    <p class="text-sm capitalize">${data.stat5Name}: ${data.stat5Value}</p>
                                    <p class="text-sm capitalize">${data.stat6Name}: ${data.stat6Value}</p>
                                    </div>

                                    </div>
                            </div>`;
        noteField.id = "note-input";
        noteField.textContent = `${data.note}`;
        noteField.placeholder = `Note for ${data.name}`;
        noteField.className = "border-gray-900 border mt-2 normal-case";
        saveNoteBtn.id = "add-notes-localstorage";
        saveNoteBtn.textContent = "Save Note";
        saveNoteBtn.className = "bg-blue-300 text-white mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500";
        subCard3.className = "flex justify-between"


        //function for save button + storage
        saveNoteBtn.addEventListener("click", () => {
            const notes = noteField.value.trim();
            if (notes == "") {
                noteField.focus();
                noteField.required = true;
                alert("You cannot submit an empty note");
            } else {
                addNotesToStorage(notes, data.id);
                saveNoteBtn.textContent = "Your note is saved!";
                saveNoteBtn.className = "bg-green-600 text-white mt-2 ";
            }
        }
    );

        //function for edit button + storage
        editNoteBtn.textContent = 'Edit';
        editNoteBtn.className = 'text-orange-500 ml-2 pl-2';
        editNoteBtn.addEventListener('click', () => {
            const newNote = prompt('Edit your Note', noteField.value);
            if (newNote !== null) {
                noteField.value = newNote.trim();
                addNotesToStorage(newNote, data.id);
                saveNoteBtn.textContent = "Save Note";
                saveNoteBtn.className = "bg-blue-300 text-white mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500";
            } else {
                alert(console.error());
            }
        });

        //function for delete button + storage
        deleteNoteBtn.textContent = "Delete";
        deleteNoteBtn.className = 'text-red-500 ml-2 right-0 pr-4';
        deleteNoteBtn.addEventListener('click', () => {
            noteField.value = '';
            addNotesToStorage(noteField, data.id);
        });

        mainCard.className = "flex gap-3 mb-2";

        card.classList.add("bg-white", "list-none", "my-2", "p-2", "flex", "flex-col", "rounded-md", "border", "shadow-md");
        card.innerHTML = `
  <img class='h-36 w-36 mx-auto ' src='${data.pic}'/>
  <div class="flex gap-2">
  <p class='capitalize'>#${data.id}</p>
  <p class='capitalize'>${data.name}</p>
  </div><p class='capitalize'>${data.type}</p>`;

        // element-adding
        subCard.append(subCard1, subCard2);
        subCard2.append(subCardH2, noteField, saveNoteBtn, subCard3);
        subCard3.append(editNoteBtn, deleteNoteBtn)
        mainCard.appendChild(card);
        mainCard.appendChild(subCard);

        listContainer.appendChild(mainCard);
    });
}

// Create Save/Remove Button
export function createStorageBtn(data, parentElement, content) {
    // Create Button
    const btn = document.createElement("button");
    btn.id = data.id;
    btn.textContent = content;
    btn.className = "p-1 rounded-lg outline-1 text-white text-md transition delay-100 duration-100 ease-in-out hover:scale-105";

    // Save/Remove specific additions
    if (content === "Remove") {
        btn.classList.add("bg-red-500", "hover:bg-rose-500");
        btn.addEventListener("click", () => removeFavorite(data));
    } else {
        btn.classList.add("bg-blue-500", "hover:bg-indigo-500");
        btn.addEventListener("click", () => storeFavourites(data));
    }

    // Prepend
    parentElement.prepend(btn);
}

// Clear Save/Remove Button
export function removeStorageBtn(id) {
    const currentBtn = document.getElementById(id);
    const parentElement = currentBtn.parentElement;
    currentBtn.remove();
    return parentElement;
}
