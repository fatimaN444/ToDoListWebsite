// Select elements from the DOM
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

// Add a static message element to the list (hidden by default)
const staticMessage = document.createElement("li");
staticMessage.classList.add("static-message");
staticMessage.innerText = "No todos yet! Start by adding a new task";
todosUL.appendChild(staticMessage);

// Get the todos from localStorage (if any) or initialize an empty array
const todos = JSON.parse(localStorage.getItem("todos")) || [];

// Load the saved todos and display them
todos.forEach((todo) => addTodo(todo));

// Check if there are any todos and show or hide the static message
if (todos.length > 0) {
  staticMessage.style.display = "none"; // Hide the static message if there are todos
} else {
  staticMessage.style.display = "block"; // Show the static message if no todos
}

// Listen for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = input.value.trim(); // Get the input value and trim extra spaces
  if (todoText) { // Check if todoText is not empty
    const newTodo = { text: todoText, completed: false }; // Create a new todo object
    todos.push(newTodo); // Add it to the todos array
    addTodo(newTodo); // Add it to the UI
    updateLocalStorage(); // Save to localStorage
    input.value = ""; // Clear the input field after submission
    staticMessage.style.display = "none"; // Hide the static message after adding a todo
  } else {
    alert("Please enter a valid todo!"); // Optionally, show an alert if the input is empty
  }
});

// Function to create a new todo item in the DOM
function addTodo(todo) {
  const todoEl = document.createElement("li"); // Create a new list item
  
  // Ensure we are adding a valid class name and not an empty one
  if (todo.completed) {
    todoEl.classList.add("completed");
  }

  // Set the text of the todo
  todoEl.innerText = todo.text;

  // Create a remove button for the todo item
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.innerText = "❌";
  removeBtn.addEventListener("click", () => {
    // Remove the todo from the array and update the UI
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    todoEl.remove();
    updateLocalStorage();

    // Show static message again if the todo list is empty
    if (todos.length === 0) {
      staticMessage.style.display = "block";
    }
  });

  // Add the remove button to the todo item
  todoEl.appendChild(removeBtn);

  // Add an event listener to mark the todo as completed when clicked
  todoEl.addEventListener("click", () => {
    todo.completed = !todo.completed;
    todoEl.classList.toggle("completed");
    updateLocalStorage();
  });

  // Append the todo item to the list
  todosUL.appendChild(todoEl);
}

// Function to update localStorage whenever the todos list changes
function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));

  // Check if the todo list is empty and show the static message if needed
  if (todos.length === 0) {
    staticMessage.style.display = "block";
  }
}
