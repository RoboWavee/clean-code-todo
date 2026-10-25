//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTaskHolder = document.getElementById('todo-list'); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById('completed-list'); //completed-tasks

//New task list itemfunction createNewTaskElement(taskString)
function createNewTaskElement(taskText) {
  const taskElement = document.createElement('li');

  //input (checkbox)
  const checkbox = document.createElement('input'); //checkbx
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteIcon = document.createElement('img'); //delete button image

  label.innerText = taskText;
  label.className = 'task';

  //Each elements, needs appending
  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  //and appending.
  taskElement.appendChild(checkbox);
  taskElement.appendChild(label);
  taskElement.appendChild(editInput);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);
  return taskElement;
}
function addTask() {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const taskElement = createNewTaskElement(taskInput.value);

  //Append taskElementto incompleteTaskHolder
  incompleteTaskHolder.appendChild(taskElement);
  bindTaskEvents(taskElement, taskCompleted);

  taskInput.value = '';
}

//Edit an existing task.
function editTask() {
  const taskElement = this.parentNode;

  const editInput = taskElement.querySelector('input[type=text]');
  const label = taskElement.querySelector('label');
  const editButton = taskElement.querySelector('.edit');
  const isEditMode = taskElement.classList.contains('is-editing');
  //If class of the parent is .editmode
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskElement.classList.toggle('is-editing');
}

//Delete task.
function deleteTask() {
  const taskElement = this.parentNode;
  const ul = taskElement.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(taskElement);
}

//Mark task completed
function taskCompleted() {
  //Append the task list item to the #completed-tasks
  const taskElement = this.parentNode;
  completedTasksHolder.appendChild(taskElement);
  bindTaskEvents(taskElement, taskIncomplete);
}

function taskIncomplete() {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const taskElement = this.parentNode;
  incompleteTaskHolder.appendChild(taskElement);
  bindTaskEvents(taskElement, taskCompleted);
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);

function bindTaskEvents(tasktaskElement, checkboxEventHandler) {
  //select taskElements children
  const checkbox = tasktaskElement.querySelector('input[type=checkbox]');
  const editButton = tasktaskElement.querySelector('button.edit');
  const deleteButton = tasktaskElement.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkbox.onchange = checkboxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
function initTaskBindings() {
  for (const task of incompleteTaskHolder.children) {
    bindTaskEvents(task, taskCompleted);
  }
  for (const task of completedTasksHolder.children) {
    bindTaskEvents(task, taskIncomplete);
  }
}
initTaskBindings();

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
