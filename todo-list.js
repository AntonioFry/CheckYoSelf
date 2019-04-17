// We need each of our ToDoLists to have to have a:
// - An id
// - Title
// - List of tasks (in an array)
// - Urgent value

class toDoList {
	constructor(id, title, tasks, urgent, checked, urgentImg) {
		this.id = id;
		this.title = title;
		this.tasks = tasks || [];
		this.urgent = urgent || false;
		this.urgentImg = urgentImg || "check-yo-self-icons/urgent.svg"; 
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
		if (this.urgent === false) {
			this.urgentImg = "check-yo-self-icons/urgent.svg";
		} else if (this.urgent === true) {
			this.urgentImg = "check-yo-self-icons/urgent-active.svg";
		}
	}
}