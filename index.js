import QuantityPicker from "./components/quantity-picker.js";
import CirclesViz from "./components/circles-viz.js";

customElements.define("quantity-picker", QuantityPicker);
customElements.define("circles-viz", CirclesViz);

const minutesPicker = document.querySelector("quantity-picker");
const circlesViz = document.querySelector("circles-viz");
const minutesLabel = document.querySelector(".minutes-label");
const startButton = document.querySelector(".start-button");

const MIN_MINUTES = 1;
const MAX_MINUTES = 5;

let state = {
  currentStep: 1,
  minutes: 1
};

startButton.addEventListener("click", () => {
  state = {
    ...state,
    currentStep: state.currentStep + 1
  };

  render(state);
});

minutesPicker.addEventListener("change", e => {
  const { value } = e.detail;

  if (value <= MAX_MINUTES && value >= MIN_MINUTES) {
    state = {
      ...state,
      minutes: value
    };

    render(state);
  }
});

/**
 * @param {{ minutes: number, currentStep: number }} state
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

  const step1Container = document.getElementById("step-1");

  if (state.currentStep === 1) {
    step1Container.style.display = "flex";
    step1Container.classList.remove("inactive");
    step1Container.classList.add("active");
  } else {
    step1Container.classList.remove("active");
    step1Container.classList.add("inactive");

    setTimeout(() => {
      step1Container.style.display = "none";
    }, 500);
  }
};

render(state);
