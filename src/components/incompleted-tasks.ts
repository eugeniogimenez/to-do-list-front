class incompletedTaskComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.fetchTasksIncompleted();
  }

  //MOSTRAR TAREAS INCOMPLETAS
  async fetchTasksIncompleted() {
    try {
      // Hacemos una solicitud para obtener las tareas completadas desde la URL proporcionada.
      const response = await fetch(
        "https://to-do-list-back-3mpv.onrender.com/ToDoList-1.0-SNAPSHOT/SvTask?completed=false"
      );
      // Convertimos la respuesta a formato JSON.
      const tasksIncompleted = await response.json();
      // Llamamos a la función para mostrar las tareas completadas en el componente.
      this.displayTasksIncompleted(tasksIncompleted);
    } catch (error) {
      // Si hay un error en la solicitud, lo mostramos en la consola.
      console.error("Error fetching completed tasksIncompleted:", error);
    }
  }

  displayTasksIncompleted(tasksIncompleted) {
    // Obtenemos el contenedor de tareas completadas en el shadow DOM.
    const tasksIncompletedContainer = this.shadow.querySelector(
      ".taskIncompleted-container"
    );

    // Vaciamos el contenido del contenedor antes de mostrar las tareas actualizadas
    tasksIncompletedContainer.innerHTML = "";

    // Iteramos a través de las tareas y creamos elementos HTML para mostrarlas en el componente.
    tasksIncompleted.forEach((taskIncompleted) => {
      const taskIncompletedDiv = document.createElement("div");
      taskIncompletedDiv.className = "taskIncompleted";

      taskIncompletedDiv.innerHTML = `
        <div class="taskIncompleted_descripcion">${taskIncompleted.descripcion}</div>
        <div class="taskIncompleted_buttons">
            <button class="tarea_no-completada" data-task-id="${taskIncompleted.id}">Marcar como completada</button>
            <button class="editar-tarea" data-task-descripcion="${taskIncompleted.descripcion}">Editar Tarea</button>
            <button class="eliminar-tarea">Eliminar tarea</button>
        </div>
      `;

      // Agregamos el evento click al botón "Marcar como completada"
      const marcarCompletadaBtn = taskIncompletedDiv.querySelector(
        ".tarea_no-completada"
      );
      marcarCompletadaBtn.addEventListener("click", () =>
        this.marcarCompletada(taskIncompleted)
      );

      //boton eliminar tarea
      const eliminarBtn = taskIncompletedDiv.querySelector(".eliminar-tarea");
      eliminarBtn.addEventListener("click", () =>
        this.eliminarTarea(taskIncompleted.id)
      );

      // boton "Editar Tarea"
      const editarTareaBtn = taskIncompletedDiv.querySelector(".editar-tarea");
      editarTareaBtn.addEventListener("click", () => {
        const newDescripcion = prompt("Ingrese la nueva descripción:");

        if (newDescripcion !== null && newDescripcion.trim() !== "") {
          this.editarDescripcion(taskIncompleted, newDescripcion);
        }
      });

      // Agregamos el elemento de tarea al contenedor de tareas completadas.
      tasksIncompletedContainer.appendChild(taskIncompletedDiv);
    });
  }
  // FIN MOSTRAR TAREAS COMPLETADAS

  //MARCAR TAREA COMO COMPLETADA
  async marcarCompletada(task) {
    try {
      const response = await fetch(
        `https://to-do-list-back-3mpv.onrender.com/ToDoList-1.0-SNAPSHOT/SvTask`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: task.id,
            task: {
              id: task.id,
              descripcion: task.descripcion,
              completed: true,
            },
          }),
        }
      );

      if (response.ok) {
        console.log("Tarea marcada como completada exitosamente.");

        // Borra la tarea que marqué como completada de la pantalla.
        this.fetchTasksIncompleted();
      } else {
        console.error("Error al marcar la tarea como completada.");
      }
    } catch (error) {
      console.error("Error al marcar la tarea como completada:", error);
    }
  }
  //FIN MARCAR TAREA COMPLETADA

  // EDITAR DESCRIPCIÓN DE TAREA
  async editarDescripcion(taskIncompleted, newDescripcion) {
    try {
      const response = await fetch(
        `https://to-do-list-back-3mpv.onrender.com/ToDoList-1.0-SNAPSHOT/SvTask`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: taskIncompleted.id,
            task: {
              id: taskIncompleted.id,
              descripcion: newDescripcion,
              completed: taskIncompleted.completed,
            },
          }),
        }
      );

      if (response.ok) {
        console.log("Descripción de tarea editada exitosamente.");
        this.fetchTasksIncompleted();
      } else {
        console.error("Error al editar la descripción de la tarea.");
      }
    } catch (error) {
      console.error("Error al editar la descripción de la tarea:", error);
    }
  }
  // FIN EDITAR DESCRIPCIÓN DE TAREA

  //ELIMINAR TAREA
  async eliminarTarea(taskId) {
    try {
      const response = await fetch(
        `https://to-do-list-back-3mpv.onrender.com/ToDoList-1.0-SNAPSHOT/SvTask?id=${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Tarea eliminada exitosamente.");
        this.fetchTasksIncompleted();
      } else {
        console.error("Error al eliminar la tarea.");
      }
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  }
  //FIN ELIMINAR TAREA

  //AGREGAR TAREA NUEVA
  async agregarTareaNueva(newDescripcion) {
    try {
      const response = await fetch(
        `https://to-do-list-back-3mpv.onrender.com/ToDoList-1.0-SNAPSHOT/SvTask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descripcion: newDescripcion,
            completed: false,
          }),
        }
      );

      if (response.ok) {
        console.log("Tarea nueva agregada exitosamente.");
        this.fetchTasksIncompleted();
      } else {
        console.error("Error al agregar la nueva tarea.");
      }
    } catch (error) {
      console.error("Error al agregar la nueva tarea:", error);
    }
  }
  //FIN AGREGAR TAREA NUEVA

  //RENDERIZADO
  render() {
    // Creamos el contenedor principal para las tareas completadas.
    const container = document.createElement("div");
    container.className = "taskIncompleted-container";

    // Creamos el título
    const title = document.createElement("h2");
    title.textContent = "Tareas Pendientes";
    title.className = "title";

    // Creamos el formulario para agregar una nueva tarea
    const form = document.createElement("form");
    form.className = "form";
    form.innerHTML = `
      <input type="text" class="form_input" id="newTaskDescription" placeholder="Nueva tarea" />
      <button type="submit" class="form_button">Agregar tarea</button>
    `;

    // Agregamos un evento submit al formulario
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const newTaskDescriptionInput = form.querySelector<HTMLInputElement>(
        "#newTaskDescription"
      );
      if (
        newTaskDescriptionInput &&
        newTaskDescriptionInput.value.trim() !== ""
      ) {
        this.agregarTareaNueva(newTaskDescriptionInput.value);
      }
    });

    // Adjuntamos el título al contenedor principal.
    this.shadow.appendChild(title);
    this.shadow.appendChild(container);
    this.shadow.appendChild(form);

    const style = document.createElement("style");
    style.textContent = `
    
    .taskIncompleted-container {
      height: 80%;
      overflow-y: auto; /* Agrega scroll vertical si el contenido excede la altura máxima */
      padding: 20px;
      
    }

    .taskIncompleted {
      padding: 20px;
      margin-bottom: 20px;
    }

    
    .taskIncompleted_descripcion {
      border: solid 1px;
      height: 50px;
      padding: 10px;
    }

    .title {
      margin-top: 0px;
      height: 5%;
      padding: 20px;
      background-color: #f4f4f4;
      
    }

    .form {
      margin-bottom: 0px;
      height: 15%;
      padding: 20px;
      background-color: #f4f4f4;
    }

    .form_input {
      width: 100%;
      height: 30px;
    }
    `;
    this.shadow.appendChild(style);
  }
}

customElements.define("incompleted-tasks", incompletedTaskComponent);
