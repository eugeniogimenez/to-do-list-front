import { html, css, LitElement } from "lit";

class HeaderComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: #202c33;
      color: #fff;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative; /* Añadido para el posicionamiento */
    }

    .app-name {
      font-weight: bold;
      font-size: 20px;
    }

    .search-icon {
      margin-right: 10px;
      font-size: 20px;
    }

    .menu-icon {
      font-size: 24px;
      cursor: pointer;
    }
  `;

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="app-name">ToDoList</div>
      <div>
        <span class="search-icon">🔍</span>
        <div class="menu-icon" @click=${this.toggleMenu}>⋮</div>
        ${this.isMenuOpen ? html`<app-menu></app-menu>` : null}
        <!-- Añadido el condicional para mostrar el menú -->
      </div>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
