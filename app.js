//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();


//Todo Div  

const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");

//Create LI

const newTodo = document.createElement('li');
newTodo.innerText = todoInput.value;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);

//Add todo to local storage

saveLocalTodos(todoInput.value);

//Checked button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);

//Deleted button

const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);

//Append to list
todoList.appendChild(todoDiv); 
//Clear Todo Input Value
todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //Delete Todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Delete Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
todo.remove();
        });
    }

    //Check Mark
    if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    }
    
}

function success() {
  if(document.getElementById("todotext").value==="") { 
           document.getElementById('button-add-input').disabled = true; 
       } else { 
           document.getElementById('button-add-input').disabled = false;
       }
   }

function filterTodo(e) {
    const todos = todoList.childNodes;
  
    todos.forEach(function (todo) {
      //ignore text and other non-element nodes
      if (todo.nodeType === Node.ELEMENT_NODE) {
        // console.log(e.target.value);
        switch (e.target.value) {
          case "all":
            todo.style.display = "flex";
            break;
          case "completed":
            if (todo.classList.contains('completed')) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
          case "uncompleted":
            if (!todo.classList.contains('completed')) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
        }
      }
    })
  }


  function saveLocalTodos(todo){
    //check if I have anything here
     let todos;
     if (localStorage.getItem("todos") === null) {
       todos = [];
     }else {
       todos = JSON.parse(localStorage.getItem("todos"));
     }
      
     todos.push(todo);
     localStorage.setItem("todos", JSON.stringify(todos));
  }

  function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    }else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
//Todo Div  

const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");

//Create LI

const newTodo = document.createElement('li');
newTodo.innerText = todo;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);


//Checked button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);

//Deleted button

const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);

//Append to list
todoList.appendChild(todoDiv); 
    });
  }


  function removeLocalTodos(todo){
     //check if I have anything here
     let todos;
     if (localStorage.getItem("todos") === null) {
       todos = [];
     }else {
       todos = JSON.parse(localStorage.getItem("todos"));
     }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem("todos", JSON.stringify(todos));
  }