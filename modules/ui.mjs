// Create Card and UI Functions

export function createCard(data) {
  // element-pointer for container and style
  const listContainer = document.getElementById("content-container");

  // element-creator
  let card = document.createElement("div");
  let cardHead = document.createElement("span");
  let cardImg = document.createElement("img");
  let pokeType = document.createElement("p");
  let pokeAbilUl = document.createElement("ul");

  //data collector
  for (let i = 0; i < data.abilities.length; i++) {
    let pokeAbilLi = document.createElement("li");
    pokeAbilUl.appendChild(pokeAbilLi);
    pokeAbilLi.textContent += `Ability ${i + 1}: ${
      data.abilities[i].ability.name
    }\n`;
  }

  // data adding
  cardHead.textContent = `No. ${data.id}: ${data.name}`;
  cardImg.src = data.sprites.front_default;
  pokeType.textContent = data.types[0].type.name;

  // style
  card.className =
    "flex flex-row p-7 m-3 bg-yellow-400 rounded-[15px] text-center border-4 border-red-500 w-1/5";
  cardImg.className = "w-full h-auto";
  pokeAbilUl.className = "text-left text-sm font-mono text-green-800";

  // element-adding
  card.appendChild(cardHead);
  card.appendChild(cardImg);
  card.appendChild(pokeAbilUl);
  listContainer.appendChild(card);
}
