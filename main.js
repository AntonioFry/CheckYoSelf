Phase 1
	Creating new To-dos:
		- Should be able to add new tasks using the add item form
			- Query the input and button within the form
			- create a function that gets the input



var addTaskInput = document.querySelector('#task-item-input');
var addTaskBtn = document.querySelector('#add-item-btn');

addTaskBtn.addEventListener('click', addTask);


addTask() {
	var asideTasks = [];
	asideTasks.push(addTaskInput.value);
	
}