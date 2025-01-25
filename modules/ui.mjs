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
    let mainCard = document.createElement("div");
    let subCard = document.createElement("div");
    let subCard1 = document.createElement("div");
    let subCard2 = document.createElement("div");
    let subCardH2 = document.createElement("h2");

    //data collector

    // style AND data adding
    subCard.className = "bg-white rounded-md flex gap-6 p-2";
    subCardH2.textContent = "Your notes:";
    subCard2.className = "flex flex-col";
    subCard1.innerHTML = `<div>
                            <div class="flex gap-2 mb-2">
                                <p>Height: ${data.height}</p>
                                <p>|</p>
                                <p>Weight: ${data.weight}</p>
                            </div>
                            <div>
                                <h2 class="text-md">Abilities:</h2>
                                <p class="text-sm capitalize">Ability 1: ${data.ability1}</p>
                                <p class="text-sm capitalize">Ability 2: ${data.ability2}</p>
                            </div>
                            <div class="flex gap-6 mb-2">
                                <h2>Stats:</h2>
                                <div>
                                    <p>${data.stat1Name}: ${data.stat1Value}</p>
                                    <p>${data.stat2Name}: ${data.stat2Value}</p>
                                    <p>${data.stat3Name}: ${data.stat3Value}</p>
                                </div>
                                <div>
                                    <p>${data.stat4Name}: ${data.stat4Value}</p>
                                    <p>${data.stat5Name}: ${data.stat5Value}</p>
                                    <p>${data.stat6Name}: ${data.stat6Value}</p>
                                </div>
                            </div>`;
    noteField.id = "note-input";
    noteField.textContent = `${data.note}`;
    noteField.placeholder = `Note for Pokemon ${data.id}`;
    noteField.className = "border-gray-900 border mt-2";
    saveNoteBtn.id = "add-notes-localstorage";
    saveNoteBtn.textContent = "Save Note";
    saveNoteBtn.className = "bg-blue-600 text-white mt-2";
    saveNoteBtn.addEventListener("click", () => {
      addToNotes(noteField, data.id);
    });

    mainCard.className = "flex gap-3 mb-2";

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
    subCard.append(subCard1, subCard2);
    subCard2.append(subCardH2, noteField, saveNoteBtn);
    mainCard.appendChild(card);
    mainCard.appendChild(subCard);
    listContainer.appendChild(mainCard);
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
