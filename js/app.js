//Problem: User interaction doesn't provide desired results.
// Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");


// new task list item
var createNewTaskElement = function(taskString){
  // create list Item
  var listItem = document.createElement("li");
  // new checkbox
  var checkBox = document.createElement("input");
  // new label
  var label = document.createElement("label")
  // new edit input
  var editInput = document.createElement("input")
  // new edit button
  var editButton = document.createElement("button")
  // new delete button
  var deleteButton = document.createElement("button")
  // append elements to new list item

  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerHTML = "Edit";
  editButton.className = "edit";
  deleteButton.innerHTML = "Delete";
  deleteButton.className = "delete";
  label.innerHTML = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}
// Add a new task
var addTask = function(){
  console.log("add task...")
  // Create a new list item with the text from the #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  // Append listItem to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}


// Edit an existing task
var editTask = function(){
  console.log("edit task...")
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  // if the class of the parent is .editMode
  if (listItem.classList.contains("editMode")){
    // Switch from .editMode
    // label text become the input's value
    label.innerHTML = editInput.value
  } else {
      // switch to .editMode
      // input value becomes the label's text
    editInput.value = label.innerHTML;;
  }
  
    // Toggle .editMode on the list item
    listItem.classList.toggle("editMode");
}



// Delete an existing task
var deleteTask = function(){
  console.log("delete task...")
    // Remove the Parent list item from the ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}



// Mark task as complete
var taskCompleted = function(){
  console.log("complete task...")
    // Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}



// Mark task as incomplete
var taskIncomplete = function(){
  console.log("incomplete task...")
  // When the checkbox is unchecked 
    // Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  // select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
    // bind the editTask to edit button
    editButton.onclick = editTask;
    // bind the deleteTask to the delete button
    deleteButton.onclick = deleteTask;
    // bind checkBoxEventHandler to the checkbox
    checkBox.onchange = checkBoxEventHandler;
}
// Set the click handler to addTask function
addButton.addEventListener("click", addTask);

for (var i = 0; i < incompleteTasksHolder.children.length; i++){
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
    
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}



    
  



