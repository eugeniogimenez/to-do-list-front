import { API_URL } from "../../config";

class TaskCompleted extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      .task-completed-container {
        padding: 20px;
      }

      header {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
        background-color: #202c33;
        color: #fff;
      }

      .task-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .chat-container {
        margin-top: 20px;
      }

      .chat-input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
      }

      .send-button {
        margin-top: 10px;
        padding: 8px 16px;
        font-size: 16px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    `;
    this.shadow.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("task-completed-container");

    // Header
    const header = document.createElement("header");
    header.textContent = "Tareas Realizadas";
    mainContainer.appendChild(header);

    // Lista de tareas realizadas
    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");

    // Función para mostrar las tareas realizadas
    const showCompletedTasks = () => {
      console.log("Soy showCompletedTasks");

      // Obtener las tareas realizadas de la API
      fetch(API_URL + "/ToDoList/SvTask?completed=true")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error al obtener las tareas realizadas.");
          }
        })
        .then((tasks) => {
          // Filtrar las tareas sin descripción
          const tasksWithDescription = tasks.filter((task) => task.descripcion);

          // Ordenar las tareas por el ID en orden ascendente
          tasksWithDescription.sort((a, b) => a.id - b.id);

          // Limpiar la lista de tareas antes de mostrar las nuevas
          taskList.innerHTML = "";

          // Mostrar las tareas realizadas
          tasksWithDescription.forEach((task) => {
            console.log("task: ", task);

            const taskItem = document.createElement("li");

            // Mostrar la descripción de la tarea
            const descriptionSpan = document.createElement("span");
            descriptionSpan.textContent = task.descripcion;
            taskItem.appendChild(descriptionSpan);

            // Botón de "Marcar como no realizada"
            const markIncompleteButton = document.createElement("button");
            markIncompleteButton.textContent = "Marcar como no realizada";
            taskItem.appendChild(markIncompleteButton);

            markIncompleteButton.addEventListener("click", () => {
              const taskId = task.id;
              // Realizar solicitud a la API para marcar la tarea como no realizada
              fetch(API_URL + "/ToDoList/SvTask?id=" + taskId, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: taskId,
                  task: {
                    id: taskId,
                    completed: false,
                  },
                }),
              })
                .then((response) => {
                  if (response.ok) {
                    // La tarea se marcó como no realizada
                    // Actualizar la interfaz de usuario según sea necesario
                    showCompletedTasks(); // Mostrar la lista actualizada de tareas realizadas
                  } else {
                    // Error al marcar la tarea como no realizada
                    console.error(
                      "Error al marcar la tarea como no realizada:",
                      response.statusText
                    );
                  }
                })
                .catch((error) => {
                  console.error(
                    "Error al marcar la tarea como no realizada:",
                    error
                  );
                });
            });

            taskList.appendChild(taskItem);
          });
        })
        .catch((error) => {
          console.error("Error al obtener las tareas realizadas:", error);
        });
    };

    // Mostrar las tareas realizadas al cargar la página
    showCompletedTasks();

    mainContainer.appendChild(taskList);

    this.shadow.appendChild(mainContainer);
  }
}

customElements.define("task-completed", TaskCompleted);
