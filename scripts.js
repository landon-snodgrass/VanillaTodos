const uncheckedIconClass = "far fa-circle";
const checkedIconClass = "fas fa-circle";
let todoList;

class Todo {
    constructor(todoText, id) {
        this.template = `<li class="todo-item" draggable="true" id="todo-item-${id}"><a href="#" class="todo-check text-danger" id="todo-check-${id}" data-id="${id}"><i class="far fa-circle todo-item-checkbox" id="todo-item-checkbox-${id}"></i></a><span class="todo-item-text">${todoText}</span><span class="controls"><a href="#" class="delete-todo" data-id="${id}""><i class="fas fa-trash"></i></a><a href="#" class="edit-todo" data-id="${id}"><i class="fas fa-edit"></i></a></span></li>`;
        this.completed = false;
        this.text = todoText;
        this.id = id
    }

    getTodoElement = () => document.getElementById(`todo-item-${this.id}`);

    getCheckbox = () => document.getElementById(`todo-check-${this.id}`);

    getCheckboxIcon = () => document.getElementById(`todo-item-checkbox-${this.id}`);

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

        // Event delegation
        this.element.addEventListener("click", (event) => {
            // Check/Uncheck todo item
            if (event.target.parentElement && event.target.parentElement.matches("a.todo-check")) {
                this.todoList[event.target.parentElement.dataset.id].checkUncheck();
            }

            // Delete todo item
            if (event.target.parentElement && event.target.parentElement.matches("a.delete-todo")) {
                const todoId = event.target.parentElement.dataset.id;
                this.deleteTodo(todoId);
            }

            // Edit todo item
            if (event.target.parentElement && event.target.parentElement.matches("a.edit-todo")) {
                const todoId = event.target.parentElement.dataset.id;
                this.editTodo(todoId);
            }
        })
    }

    addTodo(todoText) {
        let newTodo = new Todo(todoText, this.currentIndex);
        this.todoList[this.currentIndex] = newTodo;

        this.currentIndex++;

        this.element.innerHTML += newTodo.template;

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

    console.log(edit);

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