window.onload = function() {
  
  // Display the task items.
  taskDatabase.open(refreshTodos);
  
  var new_task_entry = document.getElementById('new_task_entry');
  var new_task = document.getElementById('new_task');
  
  
  // Event listeners for when user submits new task
  new_task_entry.onsubmit = function() {
    // Get the todo text.
    var text = new_task.value;
    
    // Create the task item.
    taskDatabase.createTodo(text, function(todo) {
		refreshTodos();
	});
    
    // Reset the input field to make it blank
    new_task.value = '';
    
    // Stop HTTP request
    return false;
  };
  
}

// Update the list of task items.
function refreshTodos() {  
  taskDatabase.fetchTodos(function(todos) {
    var todoList = document.getElementById('task_list');
    todoList.innerHTML = '';
    
    for(var i = 0; i < todos.length; i++) {
      var todo = todos[(todos.length - 1 - i)];

      var li = document.createElement('li');
      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.className = "todo-checkbox";
      checkbox.setAttribute("data-id", todo.timestamp);
      
      li.appendChild(checkbox);
      
      var span = document.createElement('span');
      span.innerHTML = todo.text;
      
      li.appendChild(span);
      
      todoList.appendChild(li);
      
      // Setup an event listener for the checkbox.
      checkbox.addEventListener('click', function(e) {
        var id = parseInt(e.target.getAttribute('data-id'));

        taskDatabase.deleteTodo(id, refreshTodos);
      });
    }

  });
}