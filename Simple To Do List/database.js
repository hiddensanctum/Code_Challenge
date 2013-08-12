
var taskDatabase = (function() {
  var taskList = {};
  var tempdata = null;
   
  //Open a connection to the tempdata.
  taskList.open = function(callback) {

    var version = 1;

    // Open a connection to the tempdata.
    var request = indexedDB.open('todos', version);

    request.onupgradeneeded = function(e) {
      var db = e.target.result;

      e.target.transaction.onerror = taskList.onerror;

      if (db.objectStoreNames.contains('todo')) {
        db.deleteObjectStore('todo');
      }

      var store = db.createObjectStore('todo', {
        keyPath: 'timestamp'
      });
    };


    request.onsuccess = function(e) {
		
      tempdata = e.target.result;
      

      callback();
    };
	
    request.onerror = taskList.onerror;
  };


  taskList.fetchTodos = function(callback) {
    var db = tempdata;
    var transaction = db.transaction(['todo'], 'readwrite');
    var objStore = transaction.objectStore('todo');

    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = objStore.openCursor(keyRange);

    var todos = [];

    transaction.oncomplete = function(e) {
      // Execute the callback function.
      callback(todos);
    };

    cursorRequest.onsuccess = function(e) {
      var result = e.target.result;
      
      if (!!result == false) {
        return;
      }
      
      todos.push(result.value);

      result.continue();
    };

    cursorRequest.onerror = taskList.onerror;
  };


	//creates a new task list
  taskList.createTodo = function(text, callback) {
	  
    var db = tempdata;
    var transaction = db.transaction(['todo'], 'readwrite');
    var objStore = transaction.objectStore('todo');
    var timestamp = new Date().getTime();
    
    var todo = {
      'text': text,
      'timestamp': timestamp
    };

    var request = objStore.put(todo);
    request.onsuccess = function(e) {
      callback(todo);
    };

    request.onerror = taskList.onerror;
  };

  taskList.deleteTodo = function(id, callback) {
    var db = tempdata;
    var transaction = db.transaction(['todo'], 'readwrite');
    var objStore = transaction.objectStore('todo');
    
    var request = objStore.delete(id);
    
    request.onsuccess = function(e) {
      callback();
    }
    
    request.onerror = function(e) {
      console.log(e);
    }
  };


  // Export the taskList object.
  return taskList;
}());
