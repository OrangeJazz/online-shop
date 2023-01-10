import { data } from "../ts/data";
import * as nouislider from "nouislider";
import { SliderValues } from "../ts/types";

export const currentCards = data;

export class Filters {
  cleanFilters() {
    localStorage.clear();
    const sliderYear = document.getElementById("slider-year");
    const sliderHeight = document.getElementById("slider-height");
    (sliderHeight as nouislider.target).noUiSlider?.set([28, 60]);
    (sliderYear as nouislider.target).noUiSlider?.set([1920, 2022]);
  }

  resetFilters() {
    const searchText = document.querySelector(
      ".search-input"
    ) as HTMLInputElement;
    if (searchText.value) {
      searchText.value = "";
    }
    const checkbox: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    );
    checkbox.map((el) => (el.checked = false));
    const radio: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('input[type="radio"]')
    );
    radio.map((el) => (el.checked = false));
    const sliderYear = document.getElementById("slider-year");
    const sliderHeight = document.getElementById("slider-height");
    localStorage.removeItem("yearmin");
    localStorage.removeItem("yearmax");
    localStorage.removeItem("heightmin");
    localStorage.removeItem("heightmax");
    localStorage.removeItem("search");
    localStorage.removeItem("brand");
    localStorage.removeItem("year");
    localStorage.removeItem("type");
    localStorage.removeItem("outfit");
    localStorage.removeItem("height");
    localStorage.removeItem("rare");
    (sliderHeight as nouislider.target).noUiSlider?.set([28, 60]);
    (sliderYear as nouislider.target).noUiSlider?.set([1920, 2022]);
  }

  sortingOptions() {
    const selection = document.querySelector(
      ".form-select"
    ) as HTMLSelectElement;
    if (selection.selectedIndex === 0) {
      localStorage.setItem("sort", "az");
    } else if (selection.selectedIndex === 1) {
      localStorage.setItem("sort", "za");
    } else if (selection.selectedIndex === 2) {
      localStorage.setItem("sort", "yearOld");
    } else if (selection.selectedIndex === 3) {
      localStorage.setItem("sort", "yearNew");
    } else if (selection.selectedIndex === 4) {
      localStorage.setItem("sort", "rareUp");
    } else if (selection.selectedIndex === 5) {
      localStorage.setItem("sort", "rareDown");
    }
  }
  typeOptions() {
    const inp = document.getElementsByName(
      "Type"
    ) as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < inp.length; i++) {
      if (inp[i].checked) localStorage.setItem("type", `${i}`);
    }
  }

  rareOptions() {
    const inp = document.getElementById("rare") as HTMLInputElement;
    if (inp.checked) localStorage.setItem("rare", `true`);
    else localStorage.removeItem("rare");
  }

  brandOptions() {
    const inp = document.getElementsByName(
      "Brand"
    ) as NodeListOf<HTMLInputElement>;
    const unchecked: Array<HTMLInputElement> = Array.from(inp).filter(
      (el) => el.checked === false
    );
    if (inp.length === unchecked.length) {
      localStorage.removeItem("brand");
    } else {
      const tempArr: number[] = [];
      for (let i = 0; i < inp.length; i++) {
        if (inp[i].checked) {
          tempArr.push(i);
        }
      }
      localStorage.setItem("brand", `${tempArr.join(",")}`);
    }
  }

  search(e: Event) {
    const searchName = (e.target as HTMLInputElement).value;
    localStorage.setItem("search", `${searchName}`);
  }

  outfitOption() {
    const inp = document.getElementsByName(
      "Outfit"
    ) as NodeListOf<HTMLInputElement>;
    const unchecked: Array<HTMLInputElement> = Array.from(inp).filter(
      (el) => el.checked === false
    );
    if (inp.length === unchecked.length) {
      localStorage.removeItem("outfit");
    } else {
      const tempArr: number[] = [];
      for (let i = 0; i < inp.length; i++) {
        if (inp[i].checked) {
          tempArr.push(i);
        }
      }
      localStorage.setItem("outfit", `${tempArr.join(",")}`);
    }
  }

  yearOption(values: SliderValues) {
    localStorage.setItem("yearmin", `${values[0]}`);
    localStorage.setItem("yearmax", `${values[1]}`);
  }

  heightOption(values: SliderValues) {
    localStorage.setItem("heightmin", `${values[0]}`);
    localStorage.setItem("heightmax", `${values[1]}`);
  }
}
