import "./styles/style.scss";

import { pokemonArray } from "./data/pokemon";

const newCard = document.querySelector(".card-container");

const filter = document.querySelector<HTMLInputElement>("#filter");

if (!newCard || !filter) {
  throw new Error("Issue with card querySelector");
}

const handleRender = (pokemonArray: Pokemon[]) => {
  for (let index = 0; index < pokemonArray.length; index++) {
    newCard.innerHTML = pokemonArray
      .map((pokemon) => {
        const capitalizedName =
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);
        const joinedTypes = pokemon.types.join(" & ");
        return `<div class="card">
        <img class="card__image" src="${pokemon.sprite}" alt="${capitalizedName} image">
            <div class="card__content">
            <h2 class="card__heading">${capitalizedName}</h2>
            <p class="card__text">${capitalizedName} (#${pokemon.id}) is a ${joinedTypes} type pokemon.</p>
            </div>
        </div>`;
      })
      .join("");
  }
};

const handleFilterByName = (event: Event) => {
  const userInput = (
    event.currentTarget as HTMLInputElement
  ).value.toLowerCase();
  const filteredPokemon = pokemonArray.filter((pokemon) => {
    return pokemon.name.includes(userInput);
  });
  handleRender(filteredPokemon);
};

filter.addEventListener("input", handleFilterByName);

handleRender(pokemonArray);
