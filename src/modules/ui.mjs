import { storeFavourites, removeFavorite, addNotesToStorage, checkStorage, getPokemonType } from "./storage.mjs";

// Create Card Main Page
export function createCard(data) {
    // Container
    const listContainer = document.getElementById("content-container");

    // Card
    const card = document.createElement("div");
    card.classList = "bg-white list-none my-2 p-2 flex flex-col rounded-md border shadow-md";

    // Img
    const img = document.createElement("img");
    img.classList = "h-32 w-32 mx-auto my-2";
    img.src = data.sprites.other["official-artwork"].front_default;

    // ID/Name Container
    const div1 = document.createElement("div");
    div1.classList = "flex gap-2";

    // ID
    const id = document.createElement("p");
    id.classList = "capitalize font-bold text-xl";
    id.textContent = `#${data.id}`;

    // Pokemon Name
    const pokemonName = document.createElement("p");
    pokemonName.classList = "capitalize text-xl";
    pokemonName.textContent = data.name;

    // Type Container
    const div2 = document.createElement("div");
    div2.classList = "flex gap-3 mx-auto mb-4";

    // Type 1
    const type1 = document.createElement("p");
    const typeValue1 = getPokemonType(data, 0);
    type1.classList = "capitalize bg-neutral-300 py-1 px-2 rounded-md";
    type1.style.background = getTypeColor(typeValue1);
    type1.textContent = typeValue1;

    // Type 2
    const type2 = document.createElement("p");
    const typeValue2 = getPokemonType(data, 1);
    type2.classList = "capitalize bg-neutral-300 py-1 px-2 rounded-md";
    type2.style.background = getTypeColor(typeValue2);
    type2.textContent = typeValue2;

    // Append
    listContainer.appendChild(card);
    card.append(div1, img, div2);
    div1.append(id, pokemonName);
    if (type1.textContent === type2.textContent) {
        div2.append(type1);
    } else {
        div2.append(type1, type2);
    }

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
        subCard3.className = "flex justify-between";

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
        });

        //function for edit button + storage
        editNoteBtn.textContent = "Edit";
        editNoteBtn.className = "text-orange-500 ml-2 pl-2";
        editNoteBtn.addEventListener("click", () => {
            const newNote = prompt("Edit your Note", noteField.value);
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
        deleteNoteBtn.className = "text-red-500 ml-2 right-0 pr-4";
        deleteNoteBtn.addEventListener("click", () => {
            noteField.value = "";
            addNotesToStorage(noteField, data.id);
        });

        mainCard.className = "flex gap-3 mb-2";

        card.classList.add("bg-white", "list-none", "my-2", "p-2", "flex", "flex-col", "rounded-md", "border", "shadow-md");
        card.innerHTML = `
  <img class='h-36 w-36 mx-auto ' src='${data.pic}'/>
  <div class="flex gap-2">
  <p class='capitalize'>#${data.id}</p>
  <p class='capitalize'>${data.name}</p>
  </div><p class='capitalize'>${data.type}</p><p class='capitalize'>${data.type2}</p>`;

        // element-adding
        subCard.append(subCard1, subCard2);
        subCard2.append(subCardH2, noteField, saveNoteBtn, subCard3);
        subCard3.append(editNoteBtn, deleteNoteBtn);
        mainCard.appendChild(card);
        mainCard.appendChild(subCard);

        listContainer.appendChild(mainCard);
    });
}

export function createFavoriteCard(favorites) {
    // Container
    const listContainer = document.getElementById("content-container");

    favorites.forEach((data) => {
        // Card Container
        const card = document.createElement("div");
        card.classList = "flex gap-4 mb-4";

        // Left Card
        const leftCard = document.createElement("div");
        leftCard.classList = "bg-white list-none p-2 flex flex-col rounded-md border shadow-md";

        // Img
        const img = document.createElement("img");
        img.classList = "h-32 w-32 mx-auto my-2";
        img.src = data.pic;

        // ID/Name Container
        const div1 = document.createElement("div");
        div1.classList = "flex gap-2";

        // ID
        const id = document.createElement("p");
        id.classList = "capitalize font-bold text-xl";
        id.textContent = `#${data.id}`;

        // Pokemon Name
        const pokemonName = document.createElement("p");
        pokemonName.classList = "capitalize text-xl";
        pokemonName.textContent = data.name;

        // Type Container
        const div2 = document.createElement("div");
        div2.classList = "flex gap-3 mx-auto";

        // Type 1
        const type1 = document.createElement("p");
        type1.classList = "capitalize bg-neutral-300 py-1 px-2 rounded-md";
        type1.style.background = getTypeColor(data.type1);
        type1.textContent = data.type1;

        // Type 2
        const type2 = document.createElement("p");
        type2.classList = "capitalize bg-neutral-300 py-1 px-2 rounded-md";
        type2.style.background = getTypeColor(data.type2);
        type2.textContent = data.type2;

        // Right Card
        const rightCard = document.createElement("div");
        rightCard.classList = "bg-white list-none p-3 flex flex-col rounded-md border shadow-md";

        // Right Card - Left Side
        const rightCardLeft = document.createElement("div");

        // Weight/Height Container
        const whDiv = document.createElement("div");
        whDiv.classList = "flex gap-2";

        // Weight
        const weight = document.createElement("p");
        weight.classList = "text-xl";
        weight.textContent = `Weight: ${data.weight / 10} kg | `;

        // Height
        const height = document.createElement("p");
        height.classList = "text-xl";
        height.textContent = `Height: ${data.height / 10} m`;

        // Ability Container
        const abDiv = document.createElement("div");
        abDiv.classList = "flex gap-2";

        // Right Card - Right Side
        const rightCardRight = document.createElement("div");

        // Append
        listContainer.appendChild(card);
        card.append(leftCard, rightCard);

        // Left Card
        leftCard.append(div1, img, div2);
        div1.append(id, pokemonName);
        div2.append(type1, type2);

        // Right Card
        rightCard.append(whDiv);
        whDiv.append(weight, height);
    });
}

// Create Save/Remove Button
export function createStorageBtn(data, parentElement, content) {
    const btn = document.createElement("button");
    btn.id = data.id;
    btn.textContent = content;
    btn.className = "p-1 rounded-lg outline-1 text-white text-md transition delay-100 duration-100 ease-in-out hover:scale-105";

    // Save/Remove specific configs
    if (content === "Remove") {
        btn.classList.add("bg-red-500", "hover:bg-rose-500");
        btn.addEventListener("click", () => removeFavorite(data));
    } else {
        btn.classList.add("bg-blue-500", "hover:bg-indigo-500");
        btn.addEventListener("click", () => storeFavourites(data));
    }

    // Append
    parentElement.append(btn);
}

// Clear Save/Remove Button
export function removeStorageBtn(id) {
    const currentBtn = document.getElementById(id);
    const parentElement = currentBtn.parentElement;
    currentBtn.remove();
    return parentElement;
}

// Get Pokemon Typecolor
function getTypeColor(type) {
    const types = {
        normal: "#aab09f",
        fire: "#ea7a3c",
        water: "#539ae2",
        electric: "#e5c531",
        grass: "#71c558",
        ice: "#70cbd4",
        fighting: "#cb5f48",
        poison: "#b468b7",
        ground: "#cc9f4f",
        flying: "#7da6de",
        psychic: "#e5709b",
        bug: "#94bc4a",
        rock: "#b2a061",
        ghost: "#846ab6",
        dragon: "#6a7baf",
        dark: "#736c75",
        steel: "#89a1b0",
        fairy: "#e397d1",
    };
    return types[type];
}
