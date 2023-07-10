const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("toDoList");

let editTodo = null;

const addToDo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in your to do");
  }

  if (addBtn.value === "Edit") {
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");

    p.innerHTML = inputText;

    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>  ';
    li.appendChild(editBtn);
    editBtn.classList.add("btn", "editBtn");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>  ';
    li.appendChild(deleteBtn);
    deleteBtn.classList.add("btn", "deleteBtn");

    todoList.appendChild(li);

    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};

const updateToDo = (e) => {
  if (e.target.innerHTML === '<i class="fa-solid fa-trash"></i>  ') {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }
  if (e.target.innerHTML === '<i class="fa-solid fa-pen-to-square"></i>  ') {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
};

const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {

      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);


      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>  ';
      editBtn.classList.add("btn", "editBtn");
      li.appendChild(editBtn);


      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>  ';
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
};

const deleteLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));

  console.log(todoIndex);
};

const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};
document.addEventListener("DOMContentLoaded", getLocalTodos);

addBtn.addEventListener("click", addToDo);

todoList.addEventListener("click", updateToDo);
