const css = c => c;

const styleDef = css`
  :host {
    
  }
  
  .root {
  animation-name: rotate; 
    animation-duration: 10s; 
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  :host:not([hidden]) {
    display: block;
  }

  @keyframes rotate {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
`;

export default class CirclesViz extends HTMLElement {
    // static get observedAttributes() {
    //     return ["expanded", "quantity", "max"];
    // }

    get props() {
        // const expandedAttr = this.attributes.getNamedItem("expanded");
        return {
            // expanded: expandedAttr ? expandedAttr.specified : false,
            // quantity: parseInt(this.attributes.getNamedItem("quantity").value, 10),
            // max: parseInt(this.attributes.getNamedItem("max").value, 10)
        };
    }

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        const root = document.createElement("div");
        const style = document.createElement("style");

        style.textContent = styleDef;

        root.className = "root";

        root.innerHTML= `
            <circles-viz class="circles"
            expanded
            quantity="7"
            max="11"></circles-viz>
        `

        shadow.appendChild(root);
        shadow.appendChild(style);
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, newValue, oldValue) {
        // if (name === "quantity" && newValue !== oldValue) {
        //     this.render();
        // }
    }

    render() {

    }
}
