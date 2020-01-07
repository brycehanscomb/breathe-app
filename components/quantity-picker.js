/**
 * Just using this to get IDE css syntax highlighting
 */
function css(strings) {
  return strings;
}

const styleDef = css`
  :host:not([hidden]) {
    display: inline-block;
  }

  .adjuster {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    background: transparent;
    font: inherit;
    color: inherit;
    padding: 5px 10px;
    position: relative;
    cursor: pointer;
  }

  .value {
    opacity: 0.8;
    margin: 0;
    line-height: 1;
  }

  .root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default class QuantityPicker extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  constructor() {
    super();

    const value = this.currentValue;

    const shadow = this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("div");

    const style = document.createElement("style");
    style.textContent = styleDef;

    wrapper.innerHTML = `
        <div class="root">
          <button class="adjuster more">⬆</button>
          <p class="value"></p>
          <button class="adjuster less">⬇</button>
        </div>
    `;

    shadow.appendChild(wrapper);
    shadow.appendChild(style);

    shadow
      .querySelector(".adjuster.less")
      .addEventListener("click", this.handleLessClicked.bind(this));

    shadow
      .querySelector(".adjuster.more")
      .addEventListener("click", this.handleMoreClicked.bind(this));

    // TODO: destroy event listeners when removed
  }

  get currentValue() {
    return parseInt(this.attributes.getNamedItem("value").value, 10);
  }

  handleLessClicked(e) {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: this.currentValue - 1
        },
        bubbles: true
      })
    );
  }

  handleMoreClicked(e) {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: this.currentValue + 1
        },
        bubbles: true
      })
    );
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".value").innerHTML = this.currentValue;
  }

  attributeChangedCallback(attributeName, newValue, oldValue) {
    if (attributeName !== "value") {
      return;
    }

    this.shadowRoot.querySelector(".value").innerHTML = this.currentValue;
  }
}
