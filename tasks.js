// We need each of our ToDoLists to have to have a:
// - An id
// - Title
// - List of tasks (in an array)
// - Urgent value

class ToDoLists {
	constructor(id, title, tasks, urgent) {
		this.id = id;
		this.title = title;
		this.tasks = [];
		this.urgent = urgent;
	}
}