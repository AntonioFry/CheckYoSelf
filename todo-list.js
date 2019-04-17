// We need each of our ToDoLists to have to have a:
// - An id
// - Title
// - List of tasks (in an array)
// - Urgent value

class toDoList {
	constructor(id, title, tasks, urgent, checked) {
		this.id = id;
		this.title = title;
		this.tasks = tasks || [];
		this.urgent = urgent || false;
		this.checked = checked;
	}
	
	saveToLocalStorage(allToDoLists) {
		var stringifiedLists = JSON.stringify(allToDoLists);
		localStorage.setItem('allToDoLists', stringifiedLists);
	}
	removeFromStorage(list) {
		return allToDoLists.splice(list, 1);
	}
	toggleUrgent(list) {
		this.urgent = !this.urgent;	
	}
}