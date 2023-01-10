import * as nouislider from "nouislider";
import { Filters } from "./sort";
import { Sliders } from "./sliders";
import { FilterFunc } from "./filterfunc";
import { addActualCardsOnPage } from "./htmlbuilder";

export default function init() {
  const FiltersOnPage = new Filters();
  const UseFilters = new FilterFunc();
  const SlidersOnPage = new Sliders();
  UseFilters.createCardArray();
  SlidersOnPage.sliderCreate();

  const selection = document.querySelector(".form-select") as HTMLSelectElement;
  selection.addEventListener("change", () => {
    FiltersOnPage.sortingOptions();
    UseFilters.createCardArray();
    addActualCardsOnPage();
  });

  const inputType = document.getElementsByName(
    "Type"
  ) as NodeListOf<HTMLInputElement>;
  inputType.forEach((el) =>
    el.addEventListener("click", () => {
      FiltersOnPage.typeOptions();
      UseFilters.createCardArray();
      addActualCardsOnPage();
    })
  );

  const inputRare = document.getElementById("rare") as HTMLInputElement;
  inputRare.addEventListener("click", () => {
    FiltersOnPage.rareOptions();
    UseFilters.createCardArray();
    addActualCardsOnPage();
  });

  const inputBrand = document.getElementsByName(
    "Brand"
  ) as NodeListOf<HTMLInputElement>;
  inputBrand.forEach((el) =>
    el.addEventListener("click", () => {
      FiltersOnPage.brandOptions();
      UseFilters.createCardArray();
      addActualCardsOnPage();
    })
  );

  const inputOutfit = document.getElementsByName(
    "Outfit"
  ) as NodeListOf<HTMLInputElement>;
  inputOutfit.forEach((el) =>
    el.addEventListener("change", () => {
      FiltersOnPage.outfitOption();
      UseFilters.createCardArray();
      addActualCardsOnPage();
    })
  );

  const searchText = document.querySelector(".search") as HTMLInputElement;
  searchText.oninput = (e) => {
    FiltersOnPage.search(e);
    UseFilters.createCardArray();
    addActualCardsOnPage();
  };

  const sliderYear = document.getElementById("slider-year");
  (sliderYear as nouislider.target).noUiSlider?.on("change", (values) => {
    FiltersOnPage.yearOption(values);
    UseFilters.createCardArray();
    addActualCardsOnPage();
  });
  const sliderHeight = document.getElementById("slider-height");
  (sliderHeight as nouislider.target).noUiSlider?.on("change", (values) => {
    FiltersOnPage.heightOption(values);
    UseFilters.createCardArray();
    addActualCardsOnPage();
  });

  const resetFilters = document.querySelector(
    ".reset-filters"
  ) as HTMLButtonElement;
  resetFilters.addEventListener("click", () => {
    FiltersOnPage.resetFilters();
    UseFilters.createCardArray();
    addActualCardsOnPage();
  });
  const resetOptions = document.querySelector(
    ".reset-options"
  ) as HTMLButtonElement;
  resetOptions.addEventListener("click", () => {
    FiltersOnPage.cleanFilters();
    UseFilters.createCardArray();
    addActualCardsOnPage();
  });
  addActualCardsOnPage();
}
