import { FilterList } from "./types";
import { Doll } from "./types";
import { data } from "./data";
import { cardsGenerate } from "./htmlbuilder";

export const types = ["OOAK", "BJD", "antique", "play", "collection"];
export const outfit = ["full", "wig and makeup", "only makeup", "none"];
export const brand = ["Barbie", "Pullip", "Blythe", "Iplehouse", "Other"];

export class FilterFunc {
  createFilterObj() {
    const filterList: FilterList = {
      search: localStorage.getItem("search"),
      sort: localStorage.getItem("sort"),
      brand: localStorage
        .getItem("brand")
        ?.split(",")
        .map((el) => Number(el)),
      year: [
        Number(localStorage.getItem("yearmin")),
        Number(localStorage.getItem("yearmax")),
      ],
      type: Number(localStorage.getItem("type")),
      outfit: localStorage
        .getItem("outfit")
        ?.split(",")
        .map((el) => Number(el)),
      height: [
        Number(localStorage.getItem("heightmin")),
        Number(localStorage.getItem("heightmax")),
      ],
      rare: Boolean(localStorage.getItem("rare")),
    };
    return filterList;
  }

  itemsSorted(currentData: Array<Doll>) {
    const filterObj = this.createFilterObj();
    const selection = filterObj.sort;
    let dataArr: Array<Doll> = currentData;
    switch (selection) {
      case "az":
        dataArr = currentData.sort((a, b) => {
          const nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;
      case "za":
        dataArr = currentData.sort((a, b) => {
          const nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
          return 0;
        });
        break;
      case "yearOld":
        dataArr = currentData.sort((a, b) => {
          if (a.year < b.year) return -1;
          if (a.year > b.year) return 1;
          return 0;
        });
        break;
      case "yearNew":
        dataArr = currentData.sort((a, b) => {
          if (a.year > b.year) return -1;
          if (a.year < b.year) return 1;
          return 0;
        });
        break;
      case "rareUp":
        dataArr = currentData.sort((a, b) => {
          if (a.rare > b.rare) return -1;
          if (a.rare < b.rare) return 1;
          return 0;
        });
        break;
      default:
        dataArr = currentData.sort((a, b) => {
          if (a.rare < b.rare) return -1;
          if (a.rare > b.rare) return 1;
          return 0;
        });
        break;
    }
    return dataArr;
  }

  itemsFilteredByType(currentData: Array<Doll>) {
    const dataArr: Array<Doll> = [];
    const filterObj = this.createFilterObj();
    const selectedItemIndex = filterObj.type as number;
    const selectedItem = types[selectedItemIndex];
    for (let i = 0; i < currentData.length; i++) {
      if (selectedItem === currentData[i].type) dataArr.push(currentData[i]);
    }
    return dataArr;
  }

  rareItemsSelected(currentData: Array<Doll>) {
    let dataArr: Array<Doll> = [];
    const filterObj = this.createFilterObj();
    const selectedItem = filterObj.rare;
    if (selectedItem) {
      dataArr = currentData.filter((doll) => doll.rare);
    } else {
      dataArr = [...currentData];
    }
    return dataArr;
  }

  itemsFilteredByBrand(currentData: Array<Doll>) {
    let dataArr: Array<Doll> = [];
    const filterObj = this.createFilterObj();
    const selectedItemIndex = filterObj.brand;
    const selectedItem = selectedItemIndex?.map((el) => brand[el]);
    if (selectedItem?.length === 0 || selectedItem === undefined) {
      dataArr = [...currentData];
    } else {
      for (let i = 0; i < selectedItem.length; i++) {
        for (let j = 0; j < currentData.length; j++)
          if (selectedItem[i] === currentData[j].brand)
            dataArr.push(currentData[j]);
      }
    }
    return dataArr;
  }

  itemsFilteredByOutfit(currentData: Array<Doll>) {
    let dataArr: Array<Doll> = [];
    const filterObj = this.createFilterObj();
    const selectedItemIndex = filterObj.outfit;
    const selectedItem = selectedItemIndex?.map((el) => outfit[el]);
    if (selectedItem?.length === 0 || selectedItem === undefined) {
      dataArr = [...currentData];
    } else {
      for (let i = 0; i < selectedItem.length; i++) {
        for (let j = 0; j < currentData.length; j++)
          if (selectedItem[i] === currentData[j].outfit)
            dataArr.push(currentData[j]);
      }
    }
    return dataArr;
  }

  itemsFilteredByYear(currentData: Array<Doll>) {
    const cardsArr: Array<Doll> = [];
    const filterObj = this.createFilterObj();
    for (let i = 0; i < currentData.length; i++) {
      if (
        currentData[i].year >= filterObj.year[0] &&
        currentData[i].year <= filterObj.year[1]
      )
        cardsArr.push(currentData[i]);
    }
    return cardsArr;
  }

  itemsFilteredByHeight(currentData: Array<Doll>) {
    const cardsArr: Array<Doll> = [];
    const filterObj = this.createFilterObj();
    for (let i = 0; i < currentData.length; i++) {
      if (
        currentData[i].hight >= filterObj.height[0] &&
        currentData[i].hight <= filterObj.height[1]
      )
        cardsArr.push(currentData[i]);
    }
    return cardsArr;
  }

  itemsSearched(currentData: Array<Doll>) {
    let dataArr = currentData;
    if (localStorage.getItem("search")) {
      dataArr = currentData.filter((el: Doll) =>
        el.name
          .toLowerCase()
          .includes((localStorage.getItem("search") as string).toLowerCase())
      );
    } else {
      dataArr = [...currentData];
    }
    return dataArr;
  }

  createCardArray() {
    let currentCards = [...data];
    if (localStorage.getItem("search"))
      currentCards = this.itemsSearched(currentCards);
    if (localStorage.getItem("brand"))
      currentCards = this.itemsFilteredByBrand(currentCards);
    if (localStorage.getItem("type"))
      currentCards = this.itemsFilteredByType(currentCards);
    if (localStorage.getItem("outfit"))
      currentCards = this.itemsFilteredByOutfit(currentCards);
    if (localStorage.getItem("yearmin"))
      currentCards = this.itemsFilteredByYear(currentCards);
    if (localStorage.getItem("heightmin"))
      currentCards = this.itemsFilteredByHeight(currentCards);
    if (localStorage.getItem("rare"))
      currentCards = this.rareItemsSelected(currentCards);
    if (localStorage.getItem("sort"))
      currentCards = this.itemsSorted(currentCards);
    cardsGenerate(currentCards);
  }
}
