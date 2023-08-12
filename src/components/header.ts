import { Router } from "@vaadin/router";

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
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 20px;
        }
        
        .menu {
          display: flex;
          gap: 20px;
        }

        .menu-option {
          cursor: pointer;
        }

       
      </style>

      <div class="menu">
        <div class="menu-option" id="bienvenida">Bienvenida</div>
        <div class="menu-option" id="tareasPendientes">Tareas Pendientes</div>
        <div class="menu-option" id="tareasRealizadas">Tareas Realizadas</div>
      </div>
    `;

    const tareasPendientesOption =
      this.shadow.querySelector("#tareasPendientes");

    const tareasRealizadas = this.shadow.querySelector("#tareasRealizadas");

    const bienvenidaOption = this.shadow.querySelector("#bienvenida");

    tareasPendientesOption.addEventListener("click", () => {
      Router.go("/task-incompleted");
    });

    tareasRealizadas.addEventListener("click", () => {
      Router.go("/task-completed");
    });

    bienvenidaOption.addEventListener("click", () => {
      Router.go("/welcome");
    });
  }
}

customElements.define("header-component", HeaderComponent);
