// Create Card and UI Functions
import { storeFavourites, addToNotes } from "./storage.mjs";

//Create Card Main Page
export function createCard(data) {
  // element-pointer for container and style
  const listContainer = document.getElementById("content-container");

  // element-creator
  let card = document.createElement("li");
  let saveBtn = document.createElement("button");

  //data collector

  // style AND data adding
  card.classList.add(
    "bg-white",
    "list-none",
    "my-2",
    "p-2",
    "flex",
    "flex-col",
    "rounded-md",
    "border",
    "shadow-md"
  );
  saveBtn.className = "bg-gray-600 rounded-lg outline-1 text-white text-md";
  saveBtn.textContent = "add to favorites";
  saveBtn.id = data.id;

  card.innerHTML = `
  <img class='mx-auto' src='${data.sprites.front_default}'/>
  <div class="flex gap-2">
  <p class='capitalize'>#${data.id}</p>
  <p class='capitalize'>${data.name}</p>
  </div><p class='capitalize'>${data.types[0].type.name}</p>`;

  saveBtn.addEventListener("click", () => storeFavourites(data));

  // element-adding
  card.prepend(saveBtn);
  listContainer.appendChild(card);
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
    // let subCard = document.createElement("")

    //data collector

    // style AND data adding
    noteField.id = "note-input";
    noteField.textContent = `${data.note}`;
    noteField.placeholder = `Note for Pokemon ${data.id}`;
    saveNoteBtn.id = "add-notes-localstorage";
    saveNoteBtn.textContent = "Save Note";
    saveNoteBtn.className =
      "bg-gray-600 rounded-lg outline-1 text-white text-md";
    saveNoteBtn.addEventListener("click", () => {
      addToNotes(noteField, data.id);
    });

    card.classList.add(
      "bg-white",
      "list-none",
      "my-2",
      "p-2",
      "flex",
      "flex-col",
      "rounded-md",
      "border",
      "shadow-md"
    );
    card.innerHTML = `
  <img class='mx-auto' src='${data.pic}'/>
  <div class="flex gap-2">
  <p class='capitalize'>#${data.id}</p>
  <p class='capitalize'>${data.name}</p>
  </div><p class='capitalize'></p>`;

    // element-adding
    card.prepend(saveNoteBtn);
    card.appendChild(noteField);
    listContainer.appendChild(card);
    // function abilityFetch() {
    //   for (let i = 0; i < data.abilities.length; i++) {
    //     let pokeAbilLi = document.createElement("li");
    //     pokeAbilUl.appendChild(pokeAbilLi);
    //     pokeAbilLi.textContent += `Ability ${i + 1}: ${
    //       data.abilities[i].ability.name
    //     }\n`;
    //   }
    // }
  });
}
