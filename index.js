import QuantityPicker from "./components/quantity-picker.js";
import CirclesViz from "./components/circles-viz.js";

customElements.define("quantity-picker", QuantityPicker);
customElements.define("circles-viz", CirclesViz);

const minutesPicker = document.querySelector("quantity-picker");
const circlesViz = document.querySelector("circles-viz");
const minutesLabel = document.querySelector(".minutes-label");

const MIN_MINUTES = 1;
const MAX_MINUTES = 5;

minutesPicker.addEventListener("change", e => {
  const { value } = e.detail;
  if (value <= MAX_MINUTES && value >= MIN_MINUTES) {
    render({ minutes: value });
  }
});

/**
 * @param {{ minutes: number }} state
 */
const render = state => {
  minutesPicker.setAttribute("value", state.minutes.toString());
  const circlesToShow = 7 + (state.minutes - 1);
  circlesViz.setAttribute("quantity", circlesToShow.toString());

  if (state.minutes === 1) {
    minutesLabel.classList.add("hidden");
  } else {
    minutesLabel.classList.remove("hidden");
  }
};
