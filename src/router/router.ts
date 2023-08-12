import { Router } from "@vaadin/router";

export function configureRouter() {
  const router = new Router(document.getElementById("root"));

  router.setRoutes([
    //URL y page
    { path: "/", component: "welcome-page" },
    { path: "/welcome", component: "welcome-page" },
    { path: "/task-incompleted", component: "task-incompleted-page" },
    { path: "/task-completed", component: "task-completed" },
  ]);
}
