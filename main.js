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
var articleCard = document.querySelector('.todo-list-card')
var asideContainer = document.querySelector('aside')
var makeToDoList = document.querySelector('#make-list-btn');
var mainSection1 = document.querySelector('#main1')
var mainSection2 = document.querySelector('#main2')

addTaskBtn.addEventListener('click', addTask);
asideContainer.addEventListener('click', removeTask);
makeToDoList.addEventListener('click', makeNewList);

function addTask(e) {
	if (addTaskInput.value === '') {
		return alert('Please enter a task item.');
	}
	asideTasks.push(addTaskInput.value);
	var curretnIndex = (asideTasks.length -1)
	var previewedTasks = document.querySelector('#preview-tasks')
	previewedTasks.innerHTML = `<li id=${curretnIndex} class="task-item">${addTaskInput.value}</li>` + previewedTasks.innerHTML;
}

function removeTask(e) {
	var removableTask = e.target.closest('.task-item');
	if(!removableTask) {
		return;
	}
	asideTasks.splice(removableTask.id, 1);
	removableTask.remove();
}

function makeNewList() {
	var newList = new toDoList(Date.now(), titleInput.value, [], false);
	allToDolists.push(newList);
	// saveNewLists(newList);
	// allToDolists.saveToLocalStorage();
	//map over everything in local storage and if % 2 = 0 displayToDOList('left') else displayToDOList('right')
	allToDolists.map(function(elem, i) {
		if (i %2 === 0) {
			//display on left side;
		}
	});
	displayToDoList();
}

function saveLocalList() {
	var stringifyToDoList = JSON.stringify(allToDolists);
	localStorage.setItem('allToDolists', stringifyToDoList);
}

function displayToDoList(parameter) {
	let displaySection;
	if(parameter == 'left'){
		displaySection = document.querySelector('main1')
	}else {
		displaySection = document.querySelector('main2')
	}

	displaySection.innerHTML = `<article class="todo-list-card" id="todo-list-card">
				<header class="card-header">
				<h2 class="card-title">Title</h2>
				</header>
				<form class="current-tasks">
				<input type="checkbox" class="task-checkbox">Heyo	<br>
				</form>
				<footer class="card-footer">
				<div>
				<img src="check-yo-self-icons/
				urgent.svg">
				<label class="urgent-label">URGENT</label>
				</div>
				<div>
				<img src="check-yo-self-icons/delete.svg">
				<label class="delete-label">DELETE</label>
				</div>
				</footer>
				</article>` + displaySection.innerHTML;
}


// articleCard.addEventListener('click', clickArticleCard);


// function clickArticleCard(e) {
// 	e.target.classList.toggle('dan-is-cool')
// }
