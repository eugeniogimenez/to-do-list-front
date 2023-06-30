import { html, css, LitElement } from "lit";
import { Router } from "@vaadin/router";

class Menu extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      top: 100%;
      right: 0;
      background-color: #202c33;
      color: #fff;
      z-index: 1;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .menu-item {
      margin-bottom: 5px;
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <div class="menu-container">
        <div class="menu-item" @click=${() => Router.go("/welcome")}>
          Bienvenida
        </div>
        <div class="menu-item" @click=${() => Router.go("/task-incompleted")}>
          Tareas Pendientes
        </div>
        <div class="menu-item" @click=${() => Router.go("/task-completed")}>
          Tareas Completadas
        </div>
      </div>
    `;
  }
}

customElements.define("app-menu", Menu);
