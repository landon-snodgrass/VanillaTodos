import { Todo } from './Todo.js';

export class TodoList {
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
        let newTodo = new Todo(todoText, this, this.currentPosition);
        this.todoList[this.currentIndex] = newTodo;

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
        db.ref('testTodoList/').set(saveJson);

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