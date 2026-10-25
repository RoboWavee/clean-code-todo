//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.

const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('todo-list');
const completedTasksHolder = document.getElementById('completed-list');

function createNewTaskElement(taskText) {
  const taskElement = document.createElement('li');

  const checkbox = document.createElement('input');

  const label = document.createElement('label');

  const editInput = document.createElement('input');

  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');
  label.innerText = taskText;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  taskElement.appendChild(checkbox);
  taskElement.appendChild(label);
  taskElement.appendChild(editInput);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);
  return taskElement;
}
function addTask() {
  if (!taskInput.value) return;
  const taskElement = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(taskElement);
  bindTaskEvents(taskElement, taskCompleted);

  taskInput.value = '';
}

function editTask() {
  const taskElement = this.parentNode;

  const editInput = taskElement.querySelector('input[type=text]');
  const label = taskElement.querySelector('label');
  const editButton = taskElement.querySelector('.edit');
  const isEditMode = taskElement.classList.contains('is-editing');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskElement.classList.toggle('is-editing');
}

function deleteTask() {
  const taskElement = this.parentNode;
  const list = taskElement.parentNode;
  list.removeChild(taskElement);
}

function taskCompleted() {
  const taskElement = this.parentNode;
  completedTasksHolder.appendChild(taskElement);
  bindTaskEvents(taskElement, taskIncomplete);
}

function taskIncomplete() {
  const taskElement = this.parentNode;
  incompleteTaskHolder.appendChild(taskElement);
  bindTaskEvents(taskElement, taskCompleted);
}

addButton.addEventListener('click', addTask);

function bindTaskEvents(taskElement, checkboxEventHandler) {
  const checkbox = taskElement.querySelector('input[type=checkbox]');
  const editButton = taskElement.querySelector('button.edit');
  const deleteButton = taskElement.querySelector('button.delete');

  editButton.onclick = editTask;

  deleteButton.onclick = deleteTask;

  checkbox.onchange = checkboxEventHandler;
}

function initTaskBindings() {
  for (const task of incompleteTaskHolder.children) {
    bindTaskEvents(task, taskCompleted);
  }
  for (const task of completedTasksHolder.children) {
    bindTaskEvents(task, taskIncomplete);
  }
}
initTaskBindings();
