const counter = document.querySelector(".cart-count") as HTMLDivElement;
const MAX_VALUE_IN_CART = 20;
export let count = 0;
export function addToCart(e: Event) {
  const element = e.target as HTMLElement;
  const doll = element.closest(".card")?.getAttribute("id");
  if (element.closest(".card")?.classList.contains("selected")) {
    count--;
    element.closest(".card")?.classList.remove("selected");
    const dollsNameArr = localStorage
      .getItem("selectedDolls")
      ?.split(",") as string[];
    localStorage.setItem(
      "selectedDolls",
      dollsNameArr?.filter((el) => el !== doll).join(",")
    );
  } else {
    count++;
    if (count > MAX_VALUE_IN_CART) {
      alert("Sorry, but your cart is full!");
      count = MAX_VALUE_IN_CART;
      return;
    }
    element.closest(".card")?.classList.add("selected");
    if (localStorage.getItem("selectedDolls")) {
      const dollsName = localStorage.getItem("selectedDolls") + `,${doll}`;
      localStorage.setItem("selectedDolls", `${dollsName}`);
    } else {
      localStorage.setItem("selectedDolls", `${doll}`);
    }
  }
  localStorage.setItem("count", count.toString());
  counter.textContent = localStorage.getItem("count");
}
