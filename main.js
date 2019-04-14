// Phase 1
// 	Creating new To-dos:
// 		- Should be able to add new tasks using the add item form
// 			- Query the input and button within the form
// 			- create a function that gets the input



var asideTasks = [];
var allToDoLists = [];
var addTaskInput = document.querySelector('#task-item-input');
var addTaskBtn = document.querySelector('#add-item-btn');
var titleInput = document.querySelector('#task-title-input')
var articleCard = document.querySelector('.todo-list-card')
var asideContainer = document.querySelector('aside')
var makeToDoList = document.querySelector('#make-list-btn');
var mainSection1 = document.querySelector('#main1')
var mainSection2 = document.querySelector('#main2')
var urgentBtn = document.querySelector('#urgent-btn')
var clearAllBtn = document.querySelector('#clear-task-btn')

// window.addEventListener('load', pageLoad);
addTaskBtn.addEventListener('click', addTask);
asideContainer.addEventListener('click', removePreviewedTasks);
makeToDoList.addEventListener('click', makeNewList);
urgentBtn.addEventListener('click', toggleUrgent);
clearAllBtn.addEventListener('click', clearAll);

function addTask(e) {
	if (addTaskInput.value === '') {
		return alert('Please enter a task item.');
	}
	asideTasks.push(addTaskInput.value);
	var curretnIndex = (asideTasks.length -1)
	var previewedTasks = document.querySelector('#preview-tasks')
	previewedTasks.innerHTML = `<li id=${curretnIndex} class="task-item">${addTaskInput.value}</li>` + previewedTasks.innerHTML;
}

function removePreviewedTasks(e) {
	var removableTask = e.target.closest('.task-item');
	if(!removableTask) {
		return;
	}
	asideTasks.splice(removableTask.id, 1);
	removableTask.remove();
}

function clearAll(e) {
	titleInput.value = null;
	asideTasks.map(function(index) {
		asideTasks.splice(index, asideTasks.length);
	})
	document.querySelector('#preview-tasks').innerHTML = '';
}

function makeNewList() {
	var newList = new toDoList(Date.now(), titleInput.value, [], false);
	newList.tasks = newList.tasks.concat(asideTasks);
	allToDoLists.push(newList);
	newList.saveToLocalStorage();
	// map over everything in local storage and if % 2 = 0 displayToDoList('left') else displayToDoList('right')
	allToDoLists.map(function() {
		if (index %2 === 0) {
			newList.side = 'left';
			// display on left side;
		} else {
			newList.side = 'right';
		}
	});
	displayToDoList(newList);
}

// function saveLocalList() {
// 	var stringifyToDoList = JSON.stringify(allToDoLists);
// 	localStorage.setItem('allToDoLists', stringifyToDoList);
// }

function displayToDoList(obj) {
	let displaySection;
	if (obj.side === 'left') {
		displaySection = document.querySelector('#main1')
	} else if (obj.side === 'right') {
		displaySection = document.querySelector('#main2')
	}
	console.log(displaySection)
	displaySection.innerHTML = `<article class="todo-list-card" id="${obj.id}">
				<header class="card-header">
				<h2 class="card-title">${obj.title}</h2>
				</header>
				<form class="current-tasks">
				${obj.map(function(elem, index) {
					elem.tasks[index] = document.querySelector(".task-checkbox").innerHTML;
				});}
				<input type="checkbox" class="task-checkbox"><br>
				</form>
				<footer class="card-footer">
				<div id="urgent-btn">
				<img src="check-yo-self-icons/
				urgent.svg">
				<label class="urgent-label">URGENT</label>
				</div>
				<div id="delete-card">
				<img src="check-yo-self-icons/delete.svg">
				<label class="delete-label">DELETE</label>
				</div>
				</footer>
				</article>` + displaySection.innerHTML;
}

function toggleUrgent() {
	if (newList.urgent === false) {
		newList.urgent = true;
		document.querySelector('#urgent-btn-icon').src = 'check-yo-self-icons/urgent-active.svg';
	} else {
		newList.urgent = false;
		document.querySelector('#urgent-btn-icon').src = 'check-yo-self-icons/urgent.svg';
	}
	// e.target.classList.toggle('urgent-card')
}


// articleCard.addEventListener('click', clickArticleCard);


// function clickArticleCard(e) {
// 	e.target.classList.toggle('dan-is-cool')
// }
