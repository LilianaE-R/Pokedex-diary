// Create Card and UI Functions

export function createCard(data) {
  // element-pointer for container and style
  const listContainer = document.getElementById("content-container");

  // element-creator
  let card = document.createElement("div");

  //data collector
  function abilityFetch() {
    for (let i = 0; i < data.abilities.length; i++) {
      let pokeAbilLi = document.createElement("li");
      pokeAbilUl.appendChild(pokeAbilLi);
      pokeAbilLi.textContent += `Ability ${i + 1}: ${
        data.abilities[i].ability.name
      }\n`;
    }
  }

  // data adding

  // style
  card.innerHTML = `
  <button class="bg-gray-600 rounded-lg outline-1 text-white text-md">Save<button>
  <img class='mx-auto' src='${data.sprites.front_default}'/>
  <div class="flex gap-2">
  <p class='capitalize'>#${data.id}</p>
  <p class='capitalize'>${data.name}</p>
  </div><p class='capitalize'>${data.types[0].type.name}</p>`;

  // element-adding

  listContainer.appendChild(card);
}

export function createLocalCard(data) {}
