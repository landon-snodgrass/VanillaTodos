const uncheckedIconClass = "far fa-circle";
const checkedIconClass = "fas fa-circle";
let todoList;

class Todo {
    constructor(todoText, id, parentTodoList) {
        this.parentTodoList = parentTodoList;
        this.completed = false;
        this.text = todoText;
        this.id = id

        // Creating the li container
        this.element = document.createElement("li");
        this.element.classList += "todo-item";
        this.element.id = `todo-item-${id}`;
        this.element.setAttribute("draggable", "true");
        // Creating the checkbox
        this.checkbox = document.createElement("a");
        this.checkbox.classList += "todo-check text-danger";
        this.checkbox.id = `todo-check-${id}`;
        this.checkbox.dataset.id = `${id}`;
        this.checkbox.innerHTML = `<i class="far fa-circle todo-item-checkbox" id="todo-item-checkbox-${id}"></i>`

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
}

class TodoList {
    constructor() {
        this.todoList = {};
        this.element = document.getElementById("todo-list");
        this.currentIndex = 0;

        this.currentDragElement = null;

        // // Event delegation for drag
        // this.element.addEventListener("dragstart", (event) => {
        //     this.currentDragElement = event.currentTarget;
        //     this.currentDragElement.style = "opacity: 0.3";
        //     console.log(this.currentDragElement);
        // });

        // this.element.addEventListener("dragend", (event) => {
        //     if (this.currentDragElement) {
        //         this.currentDragElement.style = "opacity: 1";
        //     }
        // })
    }

    addTodo(todoText) {
        let newTodo = new Todo(todoText, this.currentIndex, this);
        this.todoList[this.currentIndex] = newTodo;

        this.currentIndex++;

        this.element.appendChild(newTodo.element);

        document.getElementById("todo-text").setAttribute("edit", "");
        document.getElementById("add-todo-button").setAttribute("edit", "");
    }

    deleteTodo(todoId) {
        this.todoList[todoId].getTodoElement().remove();
        delete this.todoList[todoId];
    }

    editTodo(todoId) {
        document.getElementById("todo-text").value = this.todoList[todoId].text;
        document.getElementById("todo-text").setAttribute("edit", todoId);
        document.getElementById("add-todo-button").setAttribute("edit", todoId);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    todoList = new TodoList();
    const todoInput = document.getElementById('todo-text');
    const addTodoButton = document.getElementById('add-todo-button');
    addTodoButton.addEventListener("click", addTodoClick);

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = mm + '/' + dd + "/" + yyyy;

    document.getElementById('todays-date').innerHTML = today;

    document.addEventListener('keydown', (event) => {
        const activeEl = document.activeElement;
        if (todoInput == activeEl && event.key == "Enter") {
            addTodoEnter(todoInput);
        }
    })
});

const addTodoEnter = (todoInput) => {
    const edit = todoInput.getAttribute("edit");
    const todoText = todoInput.value;

    if (todoText == "") {
        console.log("Error");
        return;
    }

    if (edit && edit != "") {
        todoList.deleteTodo(edit);
    }

    todoList.addTodo(todoText);

    todoInput.value = "";
}

const addTodoClick = (event) => {
    const edit = event.target.getAttribute("edit");
    const todoText = document.getElementById("todo-text").value;

    if (todoText == "") {
        console.log("Error");
        return;
    }

    if (edit && edit != "") {
        todoList.deleteTodo(edit)
    }

    todoList.addTodo(todoText);

    document.getElementById("todo-text").value = "";
};