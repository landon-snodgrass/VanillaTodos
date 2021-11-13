// Add todo is broken with firebase because it's adding it at "current index" which is instantiated to 0

// Firebase stuff
const firebaseConfig = {
    apiKey: "AIzaSyAecJFhhNfMEXELKimn0qtlRx9afu3RPuM",
    authDomain: "vanilla-todos-a3f87.firebaseapp.com",
    databaseURL: "https://vanilla-todos-a3f87-default-rtdb.firebaseio.com",
    projectId: "vanilla-todos-a3f87",
    storageBucket: "vanilla-todos-a3f87.appspot.com",
    messagingSenderId: "1029295568455",
    appId: "1:1029295568455:web:fc5117c71b14134cd2a362"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const uncheckedIconClass = "far fa-circle";
const checkedIconClass = "fas fa-circle";
let todoList;


import { TodoList } from './modules/TodoList.js';



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