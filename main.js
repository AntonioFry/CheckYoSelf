// Phase 1
// 	Creating new To-dos:
// 		- Should be able to add new tasks using the add item form
// 			- Query the input and button within the form
// 			- create a function that gets the input



var asideTasks = [];
var allToDolists = [];
var addTaskInput = document.querySelector('#task-item-input');
var addTaskBtn = document.querySelector('#add-item-btn');
var titleInput = document.querySelector('#task-title-input')

addTaskBtn.addEventListener('click', addTask);

function addTask(e) {
	if (addTaskInput.value === '') {
		return alert('Please enter a task item.');
	}
	asideTasks.push(addTaskInput.value);
	var previewedTasks = document.querySelector('#preview-tasks')
	previewedTasks.innerHTML = `<li class="task-item">${addTaskInput.value}</li>` + previewedTasks.innerHTML;
}

function makeNewLists() {
	var newList = new toDoList(Date.now(), titleInput.value, [], false);
	allToDolists.push(newList)
	saveNewLists(newList);
	newList.saveToLocalStorage();
}

function saveLocalList() {
	var stringifyToDoList = JSON.stringify(allToDolists);
	localStorage.setItem('allToDolists', stringifyToDoList);
}

function saveNewLists() {
	var displayedLists = document.querySelector('main');
	displayedLists.innerHTML = ''
}
