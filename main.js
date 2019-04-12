// Phase 1
// 	Creating new To-dos:
// 		- Should be able to add new tasks using the add item form
// 			- Query the input and button within the form
// 			- create a function that gets the input



var addTaskInput = document.querySelector('#task-item-input');
var addTaskBtn = document.querySelector('#add-item-btn');
var previewedTasks = document.querySelector('#preview-tasks')

addTaskBtn.addEventListener('click', addTask);


function addTask(e) {
	var asideTasks = [];
	if (addTaskInput.value === '') {
		return alert('Please enter a task item.');
	}
	asideTasks.push(addTaskInput.value);
	asideTasks.map
}