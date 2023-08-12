const API_URL =
  "https://to-do-list-back-3mpv.onrender.com/ToDoList-1.0-SNAPSHOT";

class TaskIncompleted extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const style = document.createElement("style");
    style.textContent = `
    
      .header {
        grid-area: header;
        border: solid red 1px;
      }

      .task {
        grid-area: task;

        display: flex;
        flex-direction: column;
      }

      .footer {
        grid-area: footer;
        border: solid red 1px;
      }

      div.task-incompleted-page {
        height: 100vh;
        display: grid;
        grid-template-rows: 10% 70% 20%;
        grid-template-columns: 100%;

        grid-template-areas: 
          "header"
          "task"
          "footer";
      }

      
    `;
    this.shadow.appendChild(style);

    const div = document.createElement("div");
    div.className = "task-incompleted-page";
    div.innerHTML = `
    
    <header-component class="header"></header-component>
    <incompleted-tasks class="task"></incompleted-tasks>
    <footer-component class="footer"></footer-component>


      
    `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}

customElements.define("task-incompleted-page", TaskIncompleted);
