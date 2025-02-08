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

export function createFavoriteCard(favorites) {
    // Container
    const listContainer = document.getElementById("content-container");

    favorites.forEach((data) => {
        // Card Container
        const card = document.createElement("div");
        card.classList = "flex gap-6 mb-6";

        // Left Card
        const leftCard = document.createElement("div");
        leftCard.classList = "bg-white list-none w-56 p-2 flex flex-col rounded-md border shadow-md";

        // Img
        const img = document.createElement("img");
        img.classList = "h-30 w-30 mx-auto my-2";
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
        rightCard.classList = "bg-white list-none p-3 flex gap-24 rounded-md border shadow-md";

        // Right Card - Left Side
        const rightCardLeft = document.createElement("div");
        rightCardLeft.classList = "p-2";

        // Weight/Height Container
        const whDiv = document.createElement("div");
        whDiv.classList = "flex justify-between w-72";

        // Weight
        const weight = document.createElement("p");
        weight.classList = "text-xl font-bold";
        weight.textContent = `Weight: ${data.weight / 10}kg`;

        // Height
        const height = document.createElement("p");
        height.classList = "text-xl font-bold";
        height.textContent = `Height: ${data.height / 10}m`;

        // Ability Container
        const abDiv = document.createElement("div");
        abDiv.classList = "flex flex-col mt-8";

        // Ability Header
        const abH2 = document.createElement("h2");
        abH2.classList = "text-2xl font-bold";
        abH2.textContent = "Abilities";

        // Ability 1
        const ab1 = document.createElement("p");
        ab1.classList = "text-lg";
        ab1.textContent = data.ability1;

        // Ability 2
        const ab2 = document.createElement("p");
        ab2.classList = "text-lg";
        ab2.textContent = data.ability2;

        // Stats Container
        const statDiv = document.createElement("div");
        statDiv.classList = "flex flex-col mt-8";

        // Stat Header
        const statH2 = document.createElement("h2");
        statH2.classList = "text-2xl font-bold";
        statH2.textContent = "Stats";

        // Main Stat Container
        const mainStatDiv = document.createElement("div");
        mainStatDiv.classList = "flex gap-12";

        // Stat Left
        const statLeftDiv = document.createElement("div");

        // Stat Right
        const statRightDiv = document.createElement("div");

        // Stat 1
        const stat1 = document.createElement("p");
        stat1.classList = "text-lg capitalize";
        stat1.textContent = `${data.stat1Name}: ${data.stat1Value}`;

        // Stat 2
        const stat2 = document.createElement("p");
        stat2.classList = "text-lg capitalize";
        stat2.textContent = `${data.stat2Name}: ${data.stat2Value}`;

        // Stat 3
        const stat3 = document.createElement("p");
        stat3.classList = "text-lg capitalize";
        stat3.textContent = `${data.stat3Name}: ${data.stat3Value}`;

        // Stat 4
        const stat4 = document.createElement("p");
        stat4.classList = "text-lg capitalize";
        stat4.textContent = `${data.stat4Name}: ${data.stat4Value}`;

        // Stat 5
        const stat5 = document.createElement("p");
        stat5.classList = "text-lg capitalize";
        stat5.textContent = `${data.stat5Name}: ${data.stat5Value}`;

        // Stat 6
        const stat6 = document.createElement("p");
        stat6.classList = "text-lg capitalize";
        stat6.textContent = `${data.stat6Name}: ${data.stat6Value}`;

        // Right Card - Right Side
        const rightCardRight = document.createElement("div");
        rightCardRight.classList = "flex flex-col justify-center";

        // Note Header
        const noteH2 = document.createElement("h2");
        noteH2.classList = "text-xl font-bold";
        noteH2.textContent = "Your Notes";

        // Note Field
        const noteField = document.createElement("textarea");
        noteField.className = "border-gray-400 border mt-2 normal-case rounded-md h-24 w-56 text-lg p-1";
        noteField.textContent = `${data.note === undefined ? "" : data.note}`;
        noteField.placeholder = `Note for ${data.name[0].toUpperCase() + data.name.slice(1)}`;

        // Save Button
        const saveNoteBtn = document.createElement("button");
        saveNoteBtn.className = "p-1 rounded-lg outline-1 text-white text-md transition delay-100 duration-100 ease-in-out hover:scale-105 bg-blue-500 hover:bg-indigo-500 my-3";
        saveNoteBtn.textContent = "Save Note";
        saveNoteBtn.addEventListener("click", () => {
            const notes = noteField.value.trim();
            if (notes == "") {
                noteField.focus();
                noteField.required = true;
                alert("You cannot submit an empty note");
            } else {
                addNotesToStorage(notes, data.id);
                saveNoteBtn.textContent = "Your note is saved!";
                saveNoteBtn.className = "p-1 rounded-lg outline-1 text-white text-md bg-green-500 my-3";
            }
        });

        // Edit/Delete Container
        const btnContainer = document.createElement("div");
        btnContainer.className = "flex justify-between";

        // Edit Button
        const editNoteBtn = document.createElement("button");
        editNoteBtn.textContent = "Edit";
        editNoteBtn.className = "py-1 px-8 rounded-lg outline-1 text-white text-md transition delay-100 duration-100 ease-in-out hover:scale-105 bg-orange-500 hover:bg-yellow-500";
        editNoteBtn.addEventListener("click", () => {
            const newNote = prompt("Edit your Note", noteField.value);
            if (newNote !== null) {
                noteField.value = newNote.trim();
                addNotesToStorage(newNote, data.id);
                saveNoteBtn.textContent = "Save Note";
                saveNoteBtn.className = "p-1 rounded-lg outline-1 text-white text-md transition delay-100 duration-100 ease-in-out hover:scale-105 bg-blue-500 hover:bg-indigo-500 my-3";
            } else {
                alert(console.error());
            }
        });

        // Delete Button
        const deleteNoteBtn = document.createElement("button");
        deleteNoteBtn.textContent = "Delete";
        deleteNoteBtn.className = "py-1 px-8 rounded-lg outline-1 text-white text-md transition delay-100 duration-100 ease-in-out hover:scale-105 bg-red-500 hover:bg-rose-500";
        deleteNoteBtn.addEventListener("click", () => {
            noteField.value = "";
            addNotesToStorage(noteField, data.id);
        });

        // Append
        listContainer.appendChild(card);
        card.append(leftCard, rightCard);

        // Left Card
        leftCard.append(div1, img, div2);
        div1.append(id, pokemonName);
        if (type1.textContent === type2.textContent) {
            div2.append(type1);
        } else {
            div2.append(type1, type2);
        }

        // Right Card
        rightCard.append(rightCardLeft, rightCardRight);

        // Right Card - Left Side
        rightCardLeft.append(whDiv, abDiv, statDiv, mainStatDiv);
        whDiv.append(weight, height);
        abDiv.append(abH2, ab1, ab2);
        statDiv.append(statH2);
        mainStatDiv.append(statLeftDiv, statRightDiv);
        statLeftDiv.append(stat1, stat2, stat3);
        statRightDiv.append(stat4, stat5, stat6);

        // Right Card - Right Side
        rightCardRight.append(noteH2, noteField, saveNoteBtn, btnContainer);
        btnContainer.append(editNoteBtn, deleteNoteBtn);
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
