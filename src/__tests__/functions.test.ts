import { FilterFunc } from "../ts/filterfunc";
import { Filters } from "../ts/sort";
import { Doll } from "../ts/types";

// Storage Mock
function storageMock() {
  let storage: { [key: string]: string } = {};
  return {
    setItem: function (key: string, value?: string) {
      storage[key] = value || "";
    },

    getItem: function (key: string) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function (key: string) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function (i: number) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
    clear: function () {
      storage = {};
    },
  };
}
window.localStorage = storageMock();

// Data Mock
const current: Array<Doll> = [
  {
    id: 0,
    name: "A",
    rare: true,
    brand: "Other",
    year: 1914,
    type: "antique",
    outfit: "full",
    hight: 34,
    img: "",
  },
  {
    id: 0,
    name: "B",
    rare: true,
    brand: "Blythe",
    year: 1933,
    type: "BJD",
    outfit: "full",
    hight: 55,
    img: "",
  },
  {
    id: 0,
    name: "C",
    rare: true,
    brand: "Blythe",
    year: 1958,
    type: "OOAK",
    outfit: "full",
    hight: 22,
    img: "",
  },
];

const filtersFunc = new FilterFunc();

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
});

describe("Create filters object", () => {
  it("should add", () => {
    window.localStorage.setItem("search", "bar");
    const res = {
      brand: undefined,
      height: [0, 0],
      outfit: undefined,
      rare: false,
      search: "bar",
      sort: null,
      type: 0,
      year: [0, 0],
    };
    expect(filtersFunc.createFilterObj()).toStrictEqual(res);
  });
});

describe("Sorting", () => {
  it("should sorting data array", () => {
    window.localStorage.setItem("sort", "za");
    expect(filtersFunc.itemsSorted(current)[0].name).toStrictEqual("C");
  });
});

describe("Filter by type", () => {
  it("should filter data array by type of doll", () => {
    window.localStorage.setItem("type", "1");
    expect(
      filtersFunc.itemsFilteredByType(current).every((el) => el.type === "BJD")
    ).toBe(true);
  });
});

describe("Filter by rare", () => {
  it("should filter data array by rare of doll", () => {
    window.localStorage.setItem("rare", "true");
    expect(
      filtersFunc.rareItemsSelected(current).every((el) => el.rare === true)
    ).toBe(true);
  });
});

describe("Filter by brand", () => {
  it("should filter data array by brand of doll", () => {
    window.localStorage.setItem("brand", "2");
    expect(
      filtersFunc
        .itemsFilteredByBrand(current)
        .every((el) => el.brand === "Blythe")
    ).toBe(true);
  });
});

describe("Filter by outfit", () => {
  it("should filter data array by outfit of doll", () => {
    window.localStorage.setItem("outfit", "1");
    expect(
      filtersFunc
        .itemsFilteredByOutfit(current)
        .every((el) => el.outfit === "wig and makeup")
    ).toBe(true);
  });
});

describe("Filter by year", () => {
  it("should filter data array by year of doll", () => {
    window.localStorage.setItem("yearmin", "1924");
    window.localStorage.setItem("yearmax", "1955");

    expect(
      filtersFunc.itemsFilteredByYear(current).every((el) => {
        return el.year >= 1924 && el.year <= 1955;
      })
    ).toBe(true);
  });
});

describe("Filter by height", () => {
  it("should filter data array by height of doll", () => {
    window.localStorage.setItem("heightmin", "33");
    window.localStorage.setItem("heightmax", "70");

    expect(
      filtersFunc.itemsFilteredByHeight(current).every((el) => {
        return el.hight >= 33 && el.hight <= 70;
      })
    ).toBe(true);
  });
});

describe("Search", () => {
  it("should filter data array by search request", () => {
    window.localStorage.setItem("search", "a");

    expect(
      filtersFunc.itemsSearched(current).every((el) => {
        return el.name.toLowerCase().includes("a");
      })
    ).toBe(true);
  });
});

const filters = new Filters();

describe("Year option", () => {
  it("Save year option to local storage", () => {
    filters.yearOption(["1923", "1934"]);
    expect(window.localStorage.getItem("yearmin")).toBe("1923");
  });
});
