export default class DynamicSection extends HTMLElement {
  static get observedAttributes() {
    return ["active-section"];
  }

  get props() {
    return {
      activeSection: parseInt(
        this.attributes.getNamedItem("active-section").value,
        10
      )
    };
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("div");

    wrapper.classList.add("root");

    wrapper.innerHTML = Array(this.childElementCount)
      .fill(null)
      .map((_, index) => `<slot name="${index}"></slot>`)
      .join("\n");

    shadow.appendChild(wrapper);
  }

  render() {
    [...this.shadowRoot.querySelector(".root").children].forEach(
      (el, index) => {
        if (this.props.activeSection === index) {
          el.removeAttribute("hidden");
        } else {
          el.setAttribute("hidden", true);
        }
      }
    );
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}
