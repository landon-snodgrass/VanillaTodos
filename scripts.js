const uncheckedIconClass = "far fa-circle";
const checkedIconClass = "fas fa-circle";
let todoList;

class Todo {
    constructor(todoText, id) {
        this.template = `<li class="todo-item" id="todo-item-${id}"><a href="#" class="todo-check text-danger" id="todo-check-${id}" data-id="${id}"><i class="far fa-circle todo-item-checkbox" id="todo-item-checkbox-${id}"></i></a><span class="todo-item-text">${todoText}</span></li>`;
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
        this.element.addEventListener("click", (event) => {
            if (event.target.parentElement && event.target.parentElement.matches("a.todo-check")) {
                this.todoList[event.target.parentElement.dataset.id].checkUncheck();
            }
        })
    }

    addTodo(todoText) {
        let newTodo = new Todo(todoText, this.currentIndex);
        this.todoList[this.currentIndex] = newTodo;

        this.currentIndex++;

        this.element.innerHTML += newTodo.template;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    todoList = new TodoList();
    document.getElementById("add-todo-button").addEventListener("click", addTodoClick);

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = mm + '/' + dd + "/" + yyyy;

    document.getElementById('todays-date').innerHTML = today;
});

const addTodoClick = (event) => {
    const todoText = document.getElementById("todo-text").value;
    console.log(todoText);
    if (todoText == "") {
        console.log("Error");
        return;
    }

    todoList.addTodo(todoText);

    document.getElementById("todo-text").value = "";
};