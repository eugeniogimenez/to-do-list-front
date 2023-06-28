import { Router } from "@vaadin/router";

class WelcomePage extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    // Agregar estilos CSS para la página Welcome
    const style = document.createElement("style");
    style.textContent = `.welcome-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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

        .option-button {
          font-size: 14px;
        }
      }
    `;
    this.shadow.appendChild(style);
  }

  connectedCallback() {
    // Renderizar la página Welcome
    this.render();
  }

  render() {
    // Crear la estructura HTML de la página Welcome
    const welcomeContainer = document.createElement("div");
    welcomeContainer.classList.add("welcome-container");

    // Contenido de la página Welcome
    welcomeContainer.innerHTML = `
        <h1>Bienvenido a la aplicación</h1>
        <p>¿Qué deseas hacer?</p>
        <div class="options">
          <button class="option-button" id="pending-tasks-button">Ver tareas pendientes</button>
          <button class="option-button" id="completed-tasks-button">Ver tareas realizadas</button>
        </div>
      `;

    this.shadow.appendChild(welcomeContainer);

    // Agregar event listeners a los botones
    const pendingTasksButton = this.shadow.getElementById(
      "pending-tasks-button"
    );
    const completedTasksButton = this.shadow.getElementById(
      "completed-tasks-button"
    );

    pendingTasksButton.addEventListener("click", () => {
      // Navegar a la página de tareas pendientes (task-incompleted.ts)
      Router.go("/task-incompleted");
    });

    completedTasksButton.addEventListener("click", () => {
      // Navegar a la página de tareas realizadas (task-completed.ts)
      Router.go("/task-completed");
    });
  }
}

customElements.define("welcome-page", WelcomePage);

// class Home extends HTMLElement {
//   shadow: ShadowRoot;
//   constructor() {
//     super();
//     this.shadow = this.attachShadow({ mode: "open" });
//     // SE INICIALIZAN LOS ESTILOS DE LA PAGE
//     var style = document.createElement("style");
//     style.textContent = `
//     .welcome-container {
//       padding-top: 30px;
//       height: 100vh;
//       background-image: url(${backgroundIMG});
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       gap: 4%;
//       justify-content: space-between;
//     }

//     @media (min-width: 310px) {
//       .welcome-container {
//         padding-top: 0px;
//         gap: 10px;
//       }
//     }

//     `;
//     this.shadow.appendChild(style);
//   }

//   addListeners() {
//     // LISTENER DEL BOTON "NUEVO JUEGO"
//     const newGameButton = this.shadow.querySelector(".newgame-button");
//     newGameButton.addEventListener("click", () => {
//       Router.go("/newroom");
//     });

//   }

//   // SE CREA EL CONNECTED CALLBACK
//   connectedCallback() {
//     // RENDERIZA LA PAGE
//     this.render();
//   }
//   render() {
//     //SE CREA EL DIV DONDE SE ALOJARA LA PAGE
//     const mainPage = document.createElement("main");
//     mainPage.classList.add("welcome-container");

//     //SE RENDERIZA
//     mainPage.innerHTML = `
//     <welcome-title>Piedra Papel o Tijera</welcome-title>

//     <div class="menu-div">
//       <menu-button class="newgame-button">Nuevo juego</menu-button>
//       <menu-button class="enter-room-button">Ingresar a una sala</menu-button>
//     </div>

//     <div class="hands-container">
//       <img class="welcome-hands" src=${tijerasIMG}>
//       <img class="welcome-hands" src=${piedraImg}>
//       <img class="welcome-hands" src=${papelImg}>
//     </div>
//  `;

//     this.shadow.appendChild(mainPage);

//     // SE AGREGAN LOS LISTENERS
//     this.addListeners();
//   }
// }
// customElements.define("home-page", Home);
