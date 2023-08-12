class TaskCompleted extends HTMLElement {
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
      }

      .task {
        grid-area: task;
      }

      .footer {
        grid-area: footer;
      }

      div.task-completed-page {
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
    div.className = "task-completed-page";
    div.innerHTML = `
    
    <header-component class="header"></header-component>
    <task-component class="task"></task-component>
    <footer-component class="footer"></footer-component>


      
    `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}

customElements.define("task-completed", TaskCompleted);
