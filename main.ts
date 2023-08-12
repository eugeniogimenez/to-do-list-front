import "./src/pages/welcome";
import "./src/pages/task-incompleted";
import "./src/pages/task-completed";

//components
import "./src/components/header";
import "./src/components/menu";
import "./src/components/footer";
import "./src/components/incompleted-tasks";
import "./src/components/completed-tasks";

import "./src/router/router";
import { configureRouter } from "./src/router/router";

(function () {
  configureRouter();
})();
