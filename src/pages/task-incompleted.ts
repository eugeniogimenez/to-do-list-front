// const API_BASE_URL = process.env.RENDER_URL || "https://localhost:3000";
const API_URL = "http://localhost:8080";

class TaskIncompleted extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      .task-incompleted-container {
        padding: 20px;
      }

      header {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
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
    mainContainer.classList.add("task-incompleted-container");

    // Header
    const header = document.createElement("header");
    header.textContent = "Tareas Pendientes";
    mainContainer.appendChild(header);

    // Lista de tareas pendientes
    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");

    // Función para mostrar las tareas pendientes
    const showIncompleteTasks = () => {
      console.log("soy showIncompleteTasks");

      // Obtener las tareas pendientes de la API
      fetch(API_URL + "/ToDoList/SvTask?completed=false")
        .then((response) => response.json())
        .then((tasks) => {
          // Ordenar las tareas por el ID en orden ascendente
          tasks.sort((a, b) => a.id - b.id);

          // Limpiar la lista de tareas antes de mostrar las nuevas
          taskList.innerHTML = "";

          // Mostrar las tareas pendientes
          tasks.forEach((task) => {
            console.log("task: ", task);

            const taskItem = document.createElement("li");

            // Campo de texto para editar la descripción
            const taskInput = document.createElement("input");
            taskInput.value = task.descripcion;
            taskItem.appendChild(taskInput);

            // Botón de "Editar"
            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            taskItem.appendChild(editButton);

            editButton.addEventListener("click", () => {
              const taskId = task.id;
              // Realizar solicitud a la API para editar la tarea
              fetch(API_URL + "/ToDoList/SvTask?id=" + taskId, {
                method: "PUT",
                // Agrega las opciones de la solicitud como headers y body si es necesario
              })
                .then((response) => {
                  if (response.ok) {
                    // La tarea se editó exitosamente
                    // Actualizar la interfaz de usuario según sea necesario
                  } else {
                    // Error al editar la tarea
                    console.error(
                      "Error al editar la tarea:",
                      response.statusText
                    );
                  }
                })
                .catch((error) => {
                  console.error("Error al editar la tarea:", error);
                });
            });

            // Botón de "Marcar como realizada"
            const markCompletedButton = document.createElement("button");
            markCompletedButton.textContent = "Marcar como realizada";
            taskItem.appendChild(markCompletedButton);

            markCompletedButton.addEventListener("click", () => {
              const taskId = task.id;
              // Realizar solicitud a la API para marcar la tarea como realizada
              fetch(API_URL + "/ToDoList/SvTask?id=" + taskId, {
                method: "PUT",
                // Agrega las opciones de la solicitud como headers y body si es necesario
              })
                .then((response) => {
                  if (response.ok) {
                    // La tarea se marcó como realizada exitosamente
                    // Actualizar la interfaz de usuario según sea necesario
                    taskItem.remove(); // Eliminar la tarea de la lista
                  } else {
                    // Error al marcar la tarea como realizada
                    console.error(
                      "Error al marcar la tarea como realizada:",
                      response.statusText
                    );
                  }
                })
                .catch((error) => {
                  console.error(
                    "Error al marcar la tarea como realizada:",
                    error
                  );
                });
            });

            taskList.appendChild(taskItem);
          });
        })
        .catch((error) => {
          console.error("Error al obtener las tareas pendientes:", error);
        });
    };

    // Mostrar las tareas pendientes por defecto
    showIncompleteTasks();
    mainContainer.appendChild(taskList);

    // Chat para ingresar nuevas tareas
    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container");

    const chatInput = document.createElement("input");
    chatInput.classList.add("chat-input");
    chatInput.placeholder = "Ingresa una nueva tarea...";
    chatContainer.appendChild(chatInput);

    const sendButton = document.createElement("button");
    sendButton.classList.add("send-button");
    sendButton.textContent = "Enviar";
    chatContainer.appendChild(sendButton);

    mainContainer.appendChild(chatContainer);

    this.shadow.appendChild(mainContainer);
  }
}

customElements.define("task-incompleted-page", TaskIncompleted);
