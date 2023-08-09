import { Router } from "@vaadin/router";

class WelcomePage extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
      .welcome-container {
        display: grid;
        place-items: center;
        height: 100vh;
        background-color: #f4f4f4;
        padding: 20px;
      }

      h1 {
        font-size: 32px;
        margin-bottom: 20px;
      }

      p {
        font-size: 18px;
        margin-bottom: 30px;
      }

      .options {
        display: flex;
        gap: 20px;
      }

      .option-button {
        padding: 10px 20px;
        background-color: #4caf50;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }

      .option-button:hover {
        background-color: #45a049;
      }

      @media (max-width: 768px) {
        h1 {
          font-size: 28px;
        }

        p {
          font-size: 16px;
        }

        .options {
          flex-direction: column;
          gap: 10px;
        }

        .option-button {
          font-size: 14px;
          width: 100%;
        }
      }
    `;
    this.shadow.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const welcomeContainer = document.createElement("div");
    welcomeContainer.classList.add("welcome-container");

    welcomeContainer.innerHTML = `
      <h1>Bienvenido a tu app de Lista de Tareas</h1>
      <p>¿Qué deseas hacer?</p>
      <div class="options">
        <button class="option-button" id="pending-tasks-button">Ver tareas pendientes</button>
        <button class="option-button" id="completed-tasks-button">Ver tareas realizadas</button>
      </div>
    `;

    this.shadow.appendChild(welcomeContainer);

    const pendingTasksButton = this.shadow.getElementById(
      "pending-tasks-button"
    );
    const completedTasksButton = this.shadow.getElementById(
      "completed-tasks-button"
    );

    pendingTasksButton.addEventListener("click", () => {
      Router.go("/task-incompleted");
    });

    completedTasksButton.addEventListener("click", () => {
      Router.go("/task-completed");
    });
  }
}

customElements.define("welcome-page", WelcomePage);
