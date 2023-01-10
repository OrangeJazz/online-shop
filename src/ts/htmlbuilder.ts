import { Doll } from "../ts/types";
import { addToCart } from "../ts/cart";

export const cardsGenerate = (arr: Array<Doll>) => {
  const cardsWrapper = document.querySelector(".cards") as Element;
  cardsWrapper.innerHTML = "";
  if (arr.length === 0) {
    cardsWrapper.innerHTML =
      "<h2>Sorry, but we have no dolls with this options :(<br> Please, try something else!<h2>";
  }
  for (let i = 0; i < arr.length; i++) {
    const el = cardsWrapper.appendChild(document.createElement("div"));
    el.classList.add("col");
    el.classList.add("card-wrapper");
    el.innerHTML = `
            <div class="card" id="${arr[i].id}">
            <img src="${arr[i].img}" class="card-img-top doll-img" alt="${
      arr[i].name
    }" />
            <h5 class="card-title">${arr[i].name}</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Brand: <span>${
                  arr[i].brand
                }</span></li>
                <li class="list-group-item">Type: <span>${
                  arr[i].type
                }</span></li>
                <li class="list-group-item">Outfit: <span>${
                  arr[i].outfit
                }</span></li>
                <li class="list-group-item">Height: <span>${
                  arr[i].hight
                } cm</span></li>
                <li class="list-group-item">Year: <span>${
                  arr[i].year
                }</span></li>
                <li class="list-group-item">Rare: <span>${
                  arr[i].rare ? "yes" : "no"
                }</span></li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Card link</a>
            </div>
        </div>`;
  }

  const counter = document.querySelector(".cart-count") as HTMLDivElement;
  counter.textContent = localStorage.getItem("count")
    ? localStorage.getItem("count")
    : "0";

  const dollsCards = Array.from(document.querySelectorAll(".card"));
  if (localStorage.getItem("selectedDolls")) {
    const shownDolls = localStorage
      .getItem("selectedDolls")
      ?.split(",") as string[];
    shownDolls.forEach((el) => {
      for (let i = 0; i < dollsCards.length; i++) {
        if (dollsCards[i].getAttribute("id") === el) {
          dollsCards[i].closest(".card")?.classList.add("selected");
        }
      }
    });
  }

  const typeInputElement = Array.from(
    document.querySelectorAll('input[name="Type"]')
  ) as HTMLInputElement[];
  if (localStorage.getItem("type")) {
    typeInputElement[Number(localStorage.getItem("type"))].checked = true;
  } else {
    typeInputElement.map((el) => (el.checked = false));
  }

  const rareInputElement = document.querySelector(
    'input[name="Rarety"]'
  ) as HTMLInputElement;
  if (localStorage.getItem("rare")) {
    rareInputElement.checked = true;
  } else {
    rareInputElement.checked = false;
  }

  const brandInputElement = Array.from(
    document.querySelectorAll('input[name="Brand"]')
  ) as HTMLInputElement[];
  if (localStorage.getItem("brand")) {
    const brandChecked = localStorage
      .getItem("brand")
      ?.split(",")
      .map((el) => Number(el));
    brandChecked?.forEach((el) => {
      brandInputElement[el].checked = true;
    });
  } else {
    brandInputElement.forEach((el) => (el.checked = false));
  }

  const outfitInputElement = Array.from(
    document.querySelectorAll('input[name="Outfit"]')
  ) as HTMLInputElement[];
  if (localStorage.getItem("outfit")) {
    const outfitChecked = localStorage
      .getItem("outfit")
      ?.split(",")
      .map((el) => Number(el));
    outfitChecked?.forEach((el) => {
      outfitInputElement[el].checked = true;
    });
  } else {
    outfitInputElement.forEach((el) => (el.checked = false));
  }
};

export const addActualCardsOnPage = () => {
  const cards = document.querySelector(".cards") as HTMLDivElement;
  cards.addEventListener("click", addToCart);
};
