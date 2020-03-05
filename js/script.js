var input = document.querySelector("input[type = 'text']");
var btnAdd = document.getElementById("add");
let btnClear = document.getElementById("clear");
var ul = document.querySelector("ul");
var container = document.querySelector("div");
var lists = document.querySelectorAll("li");
let saveBtn = document.getElementById("save");

//Функция которая загружает todo-app, если список найден в локальном хранилище
function loadTodo() {
  if (localStorage.getItem("todoList")) {
    ul.innerHTML = localStorage.getItem("todoList");
  }
  var btns = document.querySelectorAll("button[id='delete']");
  btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      console.log("hello");
      // btn.parentNode.remove();
    });
  });
}

loadTodo();

//Обработчик каждого события при вводе, чтобы добавлять новое задание в список
input.addEventListener("keypress", function(keyPressed) {
  if (keyPressed.which === 13) {
    //Создание нового задания при нажатии на enter

    var li = document.createElement("li");
    var btnDelete = document.createElement("button");
    var icon = document.createElement("i");

    var newTodo = this.value;
    this.value = " ";

    icon.classList.add("fas", "fa-trash-alt");
    btnDelete.id = "delete";
    btnDelete.append(icon);
    ul.appendChild(li).append(btnDelete, newTodo);
    btns = document.querySelectorAll("button[id='delete']");
    btns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        console.log("hello");
        // btn.parentNode.remove();
      });
    });
  }
});

btnAdd.addEventListener("click", function() {
  //Создание нового задания при нажатии на enter
  var li = document.createElement("li");
  var btnDelete = document.createElement("button");
  var icon = document.createElement("i");

  var newTodo = input.value;
  input.value = " ";

  icon.classList.add("fas", "fa-trash-alt");
  btnDelete.id = "delete";
  btnDelete.append(icon);
  ul.appendChild(li).append(btnDelete, newTodo);
  btns = document.querySelectorAll("button[id='delete']");
  btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      console.log("hello");
      // btn.parentNode.remove();
    });
  });
});

//Сохранение состояние todolist чтобы пользователь мог получить к данным доступ и позже
saveBtn.addEventListener("click", function() {
  localStorage.setItem("todoList", ul.innerHTML);
});

btnClear.addEventListener("click", () => {
  localStorage.clear();
  // ul.removeChild("li");
});
