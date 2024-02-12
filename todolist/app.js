//* selectors
const todoInput = document.querySelector(".todo-input");
const addbutton = document.querySelector(".addbutton");
const todoList = document.querySelector(".list");
const filterbutton = document.querySelector(".filterbutton");

//* event listeners
addbutton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkTodo);
filterbutton.addEventListener("click", filterTodo);

//* functions

// add todo
function addTodo(event) {
  //prevent form submission
  event.preventDefault();

  //to-do div
  const tododiv = document.createElement("div");
  tododiv.classList.add("todo");

  //li
  const todoli = document.createElement("li");
  todoli.innerText = todoInput.value;
  todoli.classList.add("todo-list");
  tododiv.appendChild(todoli);

  //check button
  const checkbtn = document.createElement("button");
  checkbtn.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
  checkbtn.classList.add("checkbtn");
  tododiv.appendChild(checkbtn);

  //delete button
  const deletebtn = document.createElement("button");
  deletebtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  deletebtn.classList.add("delbtn");
  tododiv.appendChild(deletebtn);

  todoList.appendChild(tododiv);

  //clear input
  todoInput.value = "";
  console.log(todoList);
}

//delete and check buttons
function checkTodo(event) {
  const Lists = event.target.parentElement;
  //delete todo
  if (event.target.classList.contains("delbtn")) {
    Lists.remove();
  }

  if (event.target.classList.contains("checkbtn")) {
    Lists.classList.toggle("completed");
  }
}

function filterTodo(event) {
  //accessing the filter
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (event.target.value.toLowerCase()) {
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
