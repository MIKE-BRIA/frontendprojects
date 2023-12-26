//* selectors
const todoInput = document.querySelector(".todo-input");
const addbutton = document.querySelector(".addbutton");
const todoList = document.querySelector(".list");

//* event listeners
addbutton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkTodo);

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
