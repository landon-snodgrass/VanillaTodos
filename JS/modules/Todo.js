export class Todo {
    constructor(todoText, parentTodoList, position, checked = false) {
        const id = Date.now();

        this.parentTodoList = parentTodoList;
        this.completed = checked;
        this.text = todoText;
        this.id = id;
        this.position = position;

        const todoClassList = this.completed ? "todo-item checked" : "todo-item";
        const iconClassList = this.completed ? "fas fa-circle todo-item-checkbox" : "far fa-circle todo-item-checkbox";

        // Creating the li container
        this.element = document.createElement("li");
        this.element.classList = todoClassList;
        this.element.id = `todo-item-${id}`;
        this.element.setAttribute("draggable", "true");
        // Creating the checkbox
        this.checkbox = document.createElement("a");
        this.checkbox.classList += "todo-check text-danger";
        this.checkbox.id = `todo-check-${id}`;
        this.checkbox.dataset.id = `${id}`;
        this.checkbox.innerHTML = `<i class="${iconClassList}" id="todo-item-checkbox-${id}"></i>`

        // Creating the text
        this.todoText = document.createElement("span");
        this.todoText.classList += "todo-item-text";
        this.todoText.innerHTML = todoText;
        // Creating the controls 
        this.controls = document.createElement("span");
        this.controls.classList += "controls";
        // Creating the delete button
        this.deleteButton = document.createElement("a");
        this.deleteButton.classList += "delete-todo";
        this.deleteButton.href = "#";
        this.deleteButton.dataset.id = `${id}`;
        this.deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

        // Creating the edit button
        this.editButton = document.createElement("a");
        this.editButton.classList += "edit-todo";
        this.editButton.href = "#";
        this.editButton.dataset.id = `${id}`;
        this.editButton.innerHTML = `<i class="fas fa-edit"></i>`;

        // Putting it all together
        this.controls.appendChild(this.deleteButton);
        this.controls.appendChild(this.editButton);

        // Event listeners
        this.checkbox.addEventListener("click", () => {
            this.checkUncheck();
        });

        this.deleteButton.addEventListener("click", () => {
            this.parentTodoList.deleteTodo(this.id);
        });

        this.editButton.addEventListener("click", () => {
            this.parentTodoList.editTodo(this.id);
        });

        this.element.appendChild(this.checkbox);
        this.element.appendChild(this.todoText);
        this.element.appendChild(this.controls);

        // Switching the listeners to that actual todo object
        // there's still a weird bug where the first todo gets it's dragenter
        // event called when you drag the 3rd one so I have to fix that
        this.element.addEventListener("dragstart", (event) => {
            this.parentTodoList.currentDragElement = this.element;
            this.element.style = "opacity: 0.3";
        });

        this.element.addEventListener("dragend", (event) => {
            this.parentTodoList.currentDragElement = null;
            this.element.style = "opacity: 1";
        });

        this.element.addEventListener("dragenter", (event) => {
            this.parentTodoList.todoDragEnter(this.id);
        }, false);

        this.element.addEventListener("dragover", (event) => {
            event.preventDefault();
        }, false);
    }

    getTodoElement = () => this.element;

    getCheckbox = () => this.checkbox;

    getCheckboxIcon = () => this.checkbox.querySelector("i");

    checkUncheck = () => {
        this.completed = !this.completed;
        const classList = this.completed ? "todo-item checked" : "todo-item";
        const iconClassList = this.completed ? "fas fa-circle" : "far fa-circle";
        this.getTodoElement().classList = classList;
        this.getCheckboxIcon().classList = iconClassList;
    }

    toJson = () => {
        return {
            "position": this.position,
            "text": this.text,
            "checked": this.completed,
        }
    }

    static convertElementIdToId(elementId) {
        const charArray = elementId.split('');
        return charArray[charArray.length - 1];
    }
}