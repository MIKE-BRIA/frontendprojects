// * selectors
const todoInput = document.querySelector(".todo-input");
//const todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");
const todoButton = document.querySelector(".todo-button");
const filterOption = document.querySelector(".filter-todo");

// * Event listners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("click", filterTodo);

// * functions
function addTodo(event) {
  //prevent form submission
  event.preventDefault();

  //T0-do Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create li
  const newtodo = document.createElement("li");
  newtodo.innerText = todoInput.value;
  newtodo.classList.add("todo-item");
  // placing the li in div
  todoDiv.appendChild(newtodo);

  //Add todo to local storage
  saveLocalTodos(todoInput.value);

  //checkmark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //delete button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //apend to list
  todoList.appendChild(todoDiv);

  //clear input
  todoInput.value = "";
}

function deletecheck(event) {
  const item = event.target;

  //DELETE TODO
  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;

    removeLocalTodos(todo);
    //Animation to remove from list
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECKMARK
  if (item.classList.contains("complete-btn")) {
    item.parentElement.classList.toggle("completed");
  }
}

//filter function
function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value.toLowerCase()) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//saving or storing the todo
function saveLocalTodos(todo) {
  //check if we have todos already

  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

//getting todos from local storage to the todo list
function getTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //looping over them
  todos.forEach(function (todo) {
    //T0-do Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newtodo = document.createElement("li");
    newtodo.innerText = todo;
    newtodo.classList.add("todo-item");
    // placing the li in div
    todoDiv.appendChild(newtodo);

    //checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML =
      '<i class="fa fa-check" aria-hidden="true"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //apend to list
    todoList.appendChild(todoDiv);
  });
}

//function to delete todos from local storage
function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //removing elements from an array
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
