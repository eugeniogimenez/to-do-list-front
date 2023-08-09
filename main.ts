import "./src/pages/welcome";
import "./src/pages/task-incompleted";
import "./src/pages/task-completed";

import "./src/components/header";
import "./src/components/menu";
import "./src/components/footer";
import "./src/components/task-container";

import "./src/router/router";
import { configureRouter } from "./src/router/router";

(function () {
  // const root = document.getElementById("root");

  // // Crear instancia de la página Welcome
  // const welcomePage = document.createElement("welcome-page");

  // // Agregar la instancia al elemento raíz
  // root?.appendChild(welcomePage);
  configureRouter();
})();
