const uncheckedIconClass = "far fa-circle";
const checkedIconClass = "fas fa-circle";
let todoList;

class Todo {
    constructor(todoText, id, parentTodoList, position, checked = false) {
        this.parentTodoList = parentTodoList;
        this.completed = checked;
        this.text = todoText;
        this.id = id
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

class TodoList {
    constructor() {
        this.todoList = [];
        this.element = document.getElementById("todo-list");
        this.currentIndex = 0;
        this.currentPosition = 0;

        this.currentDragElement = null;
    }

    sortList() {
        this.todoList.sort((a, b) => {
            return a.position - b.position;
        });
    }

    refreshListDisplay() {
        console.log("Refresh display ", this.todoList);
        this.element.innerHTML = "";
        this.sortList();
        this.todoList.forEach(todo => {
            this.element.appendChild(todo.element);
        });

        this.saveTodoList();
    }

    todoDragEnter(underTodoId) {
        const overTodoId = Todo.convertElementIdToId(this.currentDragElement.id);
        const underTodo = this.getTodo(underTodoId);
        const overTodo = this.getTodo(overTodoId);

        if (Math.abs(underTodo.position - overTodo.position) > 1) {
            // This is that weird bug where the dragenter event of a todo two spots above fires
            return;
        }

        this.reorderList(underTodo, overTodo);
    }

    reorderList(underTodo, overTodo) {
        if (overTodo.position == underTodo.position) {
            // We're in the same spot
        } else {
            // We're in a different spot
            if (overTodo.position < underTodo.position) {
                overTodo.position = underTodo.position;
                underTodo.position = overTodo.position - 1;
                this.setTodo(overTodo.id, overTodo);
                this.setTodo(underTodo.id, underTodo);
                this.refreshListDisplay();
            } else if (overTodo.position > underTodo.position) {
                overTodo.position = underTodo.position;
                underTodo.position = overTodo.position + 1;
                this.setTodo(overTodo.id, overTodo);
                this.setTodo(underTodo.id, underTodo);
                this.refreshListDisplay();
            } else {
                console.log("I, the auspicious developer, does not know why this console log has happened. It should theoretically be impossible for this line of code to run.");
            }
        }
    }

    setTodo(todoId, newTodoData) {
        this.todoList.forEach(todo => {
            if (todo.id == todoId) {
                todo = newTodoData;
                return;
            }
        });

        this.saveTodoList();
    }

    addTodo(todoText) {
        let newTodo = new Todo(todoText, this.currentIndex, this, this.currentPosition);
        this.todoList[this.currentIndex] = newTodo;

        this.currentIndex++;
        this.currentPosition++;
        this.element.appendChild(newTodo.element);

        document.getElementById("todo-text").setAttribute("edit", "");
        document.getElementById("add-todo-button").setAttribute("edit", "");

        this.saveTodoList();
    }

    loadTodo(todoText, todoIndex, todoPosition, todoChecked) {
        let newTodo = new Todo(todoText, todoIndex, this, todoPosition, todoChecked);
        this.todoList[todoIndex] = newTodo;
        console.log(newTodo);
    }

    deleteTodo(todoId) {
        this.todoList[todoId].getTodoElement().remove();
        delete this.todoList[todoId];

        this.saveTodoList();
    }

    editTodo(todoId) {
        document.getElementById("todo-text").value = this.todoList[todoId].text;
        document.getElementById("todo-text").setAttribute("edit", todoId);
        document.getElementById("add-todo-button").setAttribute("edit", todoId);

        this.saveTodoList();
    }

    // Can overload with other stuff
    getTodo(todoId) {
        let retTodo = null;
        this.todoList.forEach(todo => {
            if (todo.id == todoId) {
                retTodo = todo;
                return;
            } else {
                //console.log(todo.id, " != ", todoId);
            }
        });
        return retTodo;
    }

    saveTodoList() {
        let todoListJson = {};
        this.todoList.forEach(todo => {
            todoListJson[todo.id] = todo.toJson();
        });

        const saveJson = {
            "testTodoList": todoListJson
        }

        // Send saveJson off to firebase

        const saveJsonString = JSON.stringify(saveJson);

        window.localStorage.clear();
        window.localStorage.setItem("todo-list", saveJsonString);
    }

    loadTodoList() {
        const newTodoListData = JSON.parse(window.localStorage.getItem("todo-list"));
        if (newTodoListData) {
            console.log(newTodoListData);
            const newTodoList = newTodoListData["testTodoList"];
            for (const todo in newTodoList) {
                this.loadTodo(newTodoList[todo].text, todo, newTodoList[todo].position, newTodoList[todo].checked);
            }

            this.refreshListDisplay();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    todoList = new TodoList();
    todoList.loadTodoList();
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