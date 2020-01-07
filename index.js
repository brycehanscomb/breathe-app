import QuantityPicker from "./components/quantity-picker.js";

customElements.define("quantity-picker", QuantityPicker);

const quantityPicker = document.querySelector("quantity-picker");

quantityPicker.addEventListener("change", e => {
  const { value } = e.detail;
  quantityPicker.setAttribute("value", value);
});
