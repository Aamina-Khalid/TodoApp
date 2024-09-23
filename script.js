const addBtn = document.querySelector(".add-btn");
const inputTask = document.querySelector(".input-task");
const taskList = document.querySelector(".task-list");


// Event Listener for adding a new task
addBtn.addEventListener("click", addTodo);

window.addEventListener("load", loadTasks);

function addTodo() {
  const todoText = inputTask.value.trim(); // Call trim() as a method


  // Check if the input is empty
  if (todoText === "") {
    alert("Please enter a task");
    return;
  }


  // Create a new list item
  const todoItem = document.createElement("li");
  todoItem.innerHTML = `
    <span class="task-text">${todoText}</span> <!-- Add class to the span -->
    <i  id="pin-btn" class="fa-solid fa-thumbtack"></i>
    <i  id="edit-btn" class="fa-regular fa-pen-to-square"></i>
    <i  id="delete-btn" class="fa-regular fa-trash-can"></i>
  `;


  // Append the new item to the task list
  taskList.appendChild(todoItem);


  // Clear the input field
  inputTask.value = "";

  // Pin Button
const pinBtn = todoItem.querySelector("#pin-btn");

pinBtn.addEventListener("click", function () {
  if (todoItem.classList.contains("pinned")) {
    todoItem.classList.remove("pinned");
    taskList.appendChild(todoItem);                   // Move the unpinned task to the bottom
    pinBtn.classList.remove("fa-thumbtack-slash");   // Remove the "unpinned" icon
    pinBtn.classList.add("fa-thumbtack");            // Add back the "pinned" icon
  } else {
    todoItem.classList.add("pinned");
    taskList.prepend(todoItem);                      // Move the pinned task to the top
    pinBtn.classList.remove("fa-thumbtack");         // Remove the "pinned" icon
    pinBtn.classList.add("fa-thumbtack-slash");      // Add the "unpinned" icon
  }
  saveTasks();
});


  // Edit Button functionality
  todoItem.querySelector("#edit-btn").addEventListener("click", function () {
    const taskTextElement = todoItem.querySelector(".task-text");
    const currentText = taskTextElement.textContent;
    const newText = prompt("Edit your task:", currentText);
    if (newText !== null && newText.trim() !== "") {
      taskTextElement.textContent = newText.trim();
    }
    saveTasks();
  });


  // Delete Button functionality
  todoItem.querySelector("#delete-btn").addEventListener("click", function () {
    taskList.removeChild(todoItem); // Remove the item from the list
  });
  saveTasks();
}
saveTasks();


// Event Listener for adding a new task when pressing Enter
inputTask.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTodo(); // Call addTodo function on Enter key press
  }
});

// Function to save tasks to localStorage
function saveTasks() {
  const tasks = [];
  const taskItems = document.querySelectorAll(".task-list li");
  
  taskItems.forEach(item => {
    const taskText = item.querySelector(".task-text").textContent;
    const isPinned = item.classList.contains("pinned");
    tasks.push({ text: taskText, pinned: isPinned });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  storedTasks.forEach(task => {
    const todoItem = createTodoItem(task.text);
    if (task.pinned) {
      todoItem.classList.add("pinned");
      taskList.prepend(todoItem); // Add pinned tasks to the top
    } else {
      taskList.appendChild(todoItem); // Add unpinned tasks normally
    }
  });
}
