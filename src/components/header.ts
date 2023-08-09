class HeaderComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        
        :host {
          color: white;
          background-color: #4caf50;
          width: 100%;
        }
      </style>

      
    `;
  }
}

customElements.define("header-component", HeaderComponent);
