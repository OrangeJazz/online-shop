import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
export class Sliders {
  sliderCreate() {
    const sliderYear = document.getElementById("slider-year") as HTMLElement;
    const sliderHeight = document.getElementById(
      "slider-height"
    ) as HTMLElement;
    const minYear = localStorage.getItem("yearmin")
      ? Number(localStorage.getItem("yearmin"))
      : 1920;
    const maxYear = localStorage.getItem("yearmax")
      ? Number(localStorage.getItem("yearmax"))
      : 2022;
    noUiSlider.create(sliderYear, {
      start: [minYear, maxYear],
      step: 1,
      connect: true,
      range: {
        min: 1920,
        max: 2022,
      },
      tooltips: {
        to: function (numericValue) {
          return numericValue.toFixed(0);
        },
      },
    });
    const minHeight = localStorage.getItem("heightmin")
      ? Number(localStorage.getItem("heightmin"))
      : 28;
    const maxHeight = localStorage.getItem("heightmax")
      ? Number(localStorage.getItem("heightmax"))
      : 60;
    noUiSlider.create(sliderHeight, {
      start: [minHeight, maxHeight],
      step: 1,
      connect: true,
      tooltips: {
        to: function (numericValue) {
          return numericValue.toFixed(0);
        },
      },
      range: {
        min: 28,
        max: 60,
      },
    });
  }
}
