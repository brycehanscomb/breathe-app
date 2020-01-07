const css = c => c;

const styleDef = css`
  :host {
    --d: 8em;
    --r: calc(var(--d) * 0.5);
  }

  :host:not([hidden]) {
    display: block;
  }

  .watch-face {
    position: relative;
  }

  .circle {
    position: absolute;
    margin: calc(var(--r) * -1);
    width: var(--d);
    height: var(--d);
    border-radius: 50%;
    background: var(--c1);
    mix-blend-mode: screen;
    transform: rotate(var(--ca)) translate(var(--r));
  }
`;

/**
 * @see https://css-tricks.com/simplifying-apple-watch-breathe-app-animation-css-variables/
 * @param {number} quantity
 * @returns {string}
 */
const createCircles = quantity => {
  const ba = 360 / quantity;
  let result = "";

  for (let ii = 0; ii < quantity; ii++) {
    const angle = (ii + 0.5) * ba - 90;
    result += `<div class="circle" style="--ca: ${angle}deg;"></div>`;
  }

  return result;
};

export default class CirclesViz extends HTMLElement {
  static get observedAttributes() {
    return ["expanded", "quantity"];
  }

  get props() {
    const expandedAttr = this.attributes.getNamedItem("expanded");
    return {
      expanded: expandedAttr ? expandedAttr.specified : false,
      quantity: parseInt(this.attributes.getNamedItem("quantity").value, 10)
    };
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const root = document.createElement("div");
    const style = document.createElement("style");

    style.textContent = styleDef;

    root.innerHTML = `
    <div class="watch-face" style="--c0: #529ca0; --c1: #61bea2;">
        ${createCircles(this.props.quantity)}
    </div>
`;

    shadow.appendChild(root);
    shadow.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, newValue, oldValue) {
    if (name === "quantity" && newValue !== oldValue) {
      this.render();
    }
  }

  render() {
    this.shadowRoot.querySelector(".watch-face").innerHTML = createCircles(
      this.props.quantity
    );
  }
}
