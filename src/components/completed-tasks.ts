class TaskComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.fetchTasksCompleted();
  }

  //MOSTRAR TAREAS COMPLETADAS
  async fetchTasksCompleted() {
    try {
      // Hacemos una solicitud para obtener las tareas completadas desde la URL proporcionada.
      const response = await fetch(
        "https://to-do-list-back-3mpv.onrender.com/ToDoList-1.0-SNAPSHOT/SvTask?completed=true"
      );
      // Convertimos la respuesta a formato JSON.
      const tasksCompleted = await response.json();
      // Llamamos a la función para mostrar las tareas completadas en el componente.
      this.displayTasksCompleted(tasksCompleted);
    } catch (error) {
      // Si hay un error en la solicitud, lo mostramos en la consola.
      console.error("Error fetching completed tasksCompleted:", error);
    }
  }

  displayTasksCompleted(tasksCompleted) {
    // Obtenemos el contenedor de tareas completadas en el shadow DOM.
    const tasksCompletedContainer = this.shadow.querySelector(
      ".taskCompleted-container"
    );

    // Vaciamos el contenido del contenedor antes de mostrar las tareas actualizadas
    tasksCompletedContainer.innerHTML = "";

    // Iteramos a través de las tareas y creamos elementos HTML para mostrarlas en el componente.
    tasksCompleted.forEach((taskCompleted) => {
      const taskCompletedDiv = document.createElement("div");
      taskCompletedDiv.className = "taskCompleted";
      taskCompletedDiv.innerHTML = `
        <div class="taskCompleted_descripcion">${taskCompleted.descripcion}</div>
        <div class="taskCompleted_buttons">
            <button class="tarea_no-completada" data-task-id="${taskCompleted.id}">Marcar como pendiente</button>
            <button class="eliminar-tarea">Eliminar tarea</button>
        </div>
      `;

      //MARCAR COMO PENDIENTE
      // Agregamos el evento click al botón "Marcar como pendiente"
      const marcarPendienteBtn = taskCompletedDiv.querySelector(
        ".tarea_no-completada"
      );
      marcarPendienteBtn.addEventListener("click", () =>
        this.marcarPendiente(taskCompleted)
      );

      //ELIMINAR TAREA
      const eliminarBtn = taskCompletedDiv.querySelector(".eliminar-tarea");
      eliminarBtn.addEventListener("click", () =>
        this.eliminarTarea(taskCompleted.id)
      );

      // Agregamos el elemento de tarea al contenedor de tareas completadas.
      tasksCompletedContainer.appendChild(taskCompletedDiv);
    });
  }
  // FIN MOSTRAR TAREAS COMPLETADAS

  //MARCAR TAREA PENDIENTE
  async marcarPendiente(task) {
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
              completed: false,
            },
          }),
        }
      );

      if (response.ok) {
        console.log("Tarea marcada como pendiente exitosamente.");

        // Borra la tarea que marqué como pendiente de la pantalla.
        this.fetchTasksCompleted();
      } else {
        console.error("Error al marcar la tarea como pendiente.");
      }
    } catch (error) {
      console.error("Error al marcar la tarea como pendiente:", error);
    }
  }
  //FIN MARCAR TAREA PENDIENTE

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
        this.fetchTasksCompleted();
      } else {
        console.error("Error al eliminar la tarea.");
      }
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  }

  //FIN ELIMINAR TAREA

  render() {
    // Creamos el contenedor principal para las tareas completadas.
    const container = document.createElement("div");
    container.className = "taskCompleted-container";

    // Creamos el título
    const title = document.createElement("h2");
    title.textContent = "Tareas Realizadas";
    title.className = "title";

    // Adjuntamos el contenedor principal al shadow DOM.
    this.shadow.appendChild(title);
    this.shadow.appendChild(container);

    const style = document.createElement("style");
    style.textContent = `
    
    .taskCompleted-container {
      height: 100%;
      overflow-y: auto; /* Agrega scroll vertical si el contenido excede la altura máxima */
      padding: 20px;
      
    }


      .taskCompleted {
        padding: 20px;
        margin-bottom: 20px;
      }

      
      .taskCompleted_descripcion {
        border: solid 1px;
        height: 50px;
        padding: 10px;
      }

      .taskCompleted_buttons {
        
      }

      .title {
        margin-top: 0px;
        height: 5%;
        padding: 20px;
        background-color: #f4f4f4;
        
      }
        
      

      
    `;
    this.shadow.appendChild(style);
  }
}

customElements.define("task-component", TaskComponent);
