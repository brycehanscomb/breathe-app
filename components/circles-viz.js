const css = c => c;

const styleDef = css`
  :host {
    --d: 8em;
    --r: calc(var(--d) * 0.5);
  }

  :host:not([hidden]) {
    display: block;
  }

  .root {
    width: 8em;
    height: 8em;
    padding-left: 8em;
    padding-top: 8em;
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
    transition: all 0.2s ease;
  }

  .circle.out {
    opacity: 0;
  }
`;

export default class CirclesViz extends HTMLElement {
  static get observedAttributes() {
    return ["expanded", "quantity", "max"];
  }

  get props() {
    const expandedAttr = this.attributes.getNamedItem("expanded");
    return {
      expanded: expandedAttr ? expandedAttr.specified : false,
      quantity: parseInt(this.attributes.getNamedItem("quantity").value, 10),
      max: parseInt(this.attributes.getNamedItem("max").value, 10)
    };
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const root = document.createElement("div");
    const style = document.createElement("style");

    style.textContent = styleDef;

    root.className = "root";

    root.innerHTML = `
    <div class="watch-face" style="--c0: #529ca0; --c1: #61bea2;">${new Array(
      this.props.max
    )
      .fill(null)
      .map((_, index) => {
        return `<div class="circle"></div>`;
      })
      .join("")}</div>
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
    this.setCircleNodes(this.props.quantity);
  }

  /**
   * @see https://css-tricks.com/simplifying-apple-watch-breathe-app-animation-css-variables/
   * @param {number} quantity
   */
  setCircleNodes(quantity) {
    const ba = 360 / quantity;

    [...this.shadowRoot.querySelectorAll(".circle")].forEach((node, index) => {
      const angle = (index + 0.5) * ba - 90;

      if (index >= this.props.quantity) {
        node.className = "circle out";
      } else {
        node.className = "circle in";
      }

      node.setAttribute("style", `--ca: ${angle}deg;`);
    });
  }
}
