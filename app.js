//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.

const SELECTORS = {
  CHECKBOX: 'input[type=checkbox]',
  TEXT_INPUT: 'input[type=text]',
  EDIT_BUTTON: 'button.edit',
  DELETE_BUTTON: 'button.delete',
  LABEL: 'label',
};

const CLASSES = {
  TASK: 'task',
  EDIT_MODE: 'is-editing',
};

const LABELS = {
  EDIT: 'Edit',
  SAVE: 'Save',
};

const DELETE_ICON_PATH = './remove.svg';

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
  label.className = CLASSES.TASK;
  return label;
}

function createEditInput() {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = CLASSES.TASK;
  return editInput;
}

function createEditButton() {
  const editButton = document.createElement('button');
  editButton.innerText = LABELS.EDIT; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';
  return editButton;
}

function createDeleteButton() {
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  deleteButton.className = 'delete';
  deleteIcon.src = DELETE_ICON_PATH;
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
  const editInput = taskElement.querySelector(SELECTORS.TEXT_INPUT);
  const label = taskElement.querySelector(SELECTORS.LABEL);
  const editButton = taskElement.querySelector(SELECTORS.EDIT_BUTTON);
  const isEditMode = taskElement.classList.contains(CLASSES.EDIT_MODE);

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = LABELS.EDIT;
  } else {
    editInput.value = label.innerText;
    editButton.innerText = LABELS.SAVE;
  }

  taskElement.classList.toggle(CLASSES.EDIT_MODE);
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
  const checkbox = taskElement.querySelector(SELECTORS.CHECKBOX);
  const editButton = taskElement.querySelector(SELECTORS.EDIT_BUTTON);
  const deleteButton = taskElement.querySelector(SELECTORS.DELETE_BUTTON);

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
