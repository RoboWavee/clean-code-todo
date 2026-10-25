//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.

const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('todo-list');
const completedTasksHolder = document.getElementById('completed-list');

function createCheckbox() {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  return checkbox;
}

function createLabel(taskText) {
  const label = document.createElement('label');
  label.innerText = taskText;
  label.className = 'task';
  return label;
}

function createEditInput() {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  return editInput;
}

function createEditButton() {
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';
  return editButton;
}

function createDeleteButton() {
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  return deleteButton;
}

function createNewTaskElement(taskText) {
  const taskElement = document.createElement('li');

  taskElement.appendChild(createCheckbox());
  taskElement.appendChild(createLabel(taskText));
  taskElement.appendChild(createEditInput());
  taskElement.appendChild(createEditButton());
  taskElement.appendChild(createDeleteButton());
  return taskElement;
}

function addTask() {
  if (!taskInput.value) return;
  const taskElement = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(taskElement);
  bindTaskEvents(taskElement, taskCompleted);

  taskInput.value = '';
}

function toggleEditMode(taskElement) {
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

function editTask() {
  const taskElement = this.parentNode;
  toggleEditMode(taskElement);
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
