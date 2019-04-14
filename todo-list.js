// We need each of our ToDoLists to have to have a:
// - An id
// - Title
// - List of tasks (in an array)
// - Urgent value

class toDoList {
	constructor(id, title, tasks, urgent, side) {
		this.id = id;
		this.title = title;
		this.tasks = [];
		this.urgent = urgent;
		this.side = side;
	}
	
	saveToLocalStorage() {
		var stringifiedLists = JSON.stringify(allToDoLists);
		localStorage.setItem('allToDoLists', stringifiedLists);
	}
}