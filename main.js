// Phase 1
// 	Creating new To-dos:
// 		- Should be able to add new tasks using the add item form
// 			- Query the input and button within the form
// 			- create a function that gets the input



var asideTasks = [];
var allToDoLists = Array.from(JSON.parse(localStorage.getItem('allToDoLists'))) || [];
var addTaskInput = document.querySelector('#task-item-input');
var addTaskBtn = document.querySelector('#add-item-btn');
var titleInput = document.querySelector('#task-title-input');
var articleCard = document.querySelector('.todo-list-card');
var asideContainer = document.querySelector('aside');
var makeToDoList = document.querySelector('#make-list-btn');
var mainSection1 = document.querySelector('#main1');
var mainSection2 = document.querySelector('#main2')
var urgentBtn = document.querySelector('#urgent-btn');
var clearAllBtn = document.querySelector('#clear-task-btn');
var mainSection = document.querySelector('main');

window.addEventListener('load', pageLoad);
addTaskBtn.addEventListener('click', addTask);
asideContainer.addEventListener('click', removePreviewedTasks);
makeToDoList.addEventListener('click', makeNewList);
// urgentBtn.addEventListener('click', toggleUrgent);
clearAllBtn.addEventListener('click', clearAll);
mainSection.addEventListener('click', deleteToDoList);

function addTask(e) {
	if (addTaskInput.value === '') {
		return alert('Please enter a task item.');
	}
	asideTasks.push(addTaskInput.value);
	var curretnIndex = (asideTasks.length -1);
	var previewedTasks = document.querySelector('#preview-tasks');
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
	asideTasks = [];
	document.querySelector('#preview-tasks').innerHTML = '';
	document.querySelector('#task-item-input').value = '';
}

function makeNewList() {
	var newList = new toDoList(Date.now(), titleInput.value, [...asideTasks]);
	allToDoLists.push(newList);
	newList.saveToLocalStorage(allToDoLists);
	// console.log(allToDoLists)
	// console.log('danimal1', allToDoLists)
	// map over everything in local storage and if % 2 = 0 displayToDoList('left') else displayToDoList('right')
	document.querySelector('#main1').innerHTML = '';
	document.querySelector('#main2').innerHTML = '';
	allToDoLists.map(function(obj, index) {
		displayToDoList(obj, index)
	});
	clearAll();
	// displayToDoList(newList, index);
}

function saveLocalList() {
	var stringifyToDoList = JSON.stringify(allToDoLists);
	localStorage.setItem('allToDoLists', stringifyToDoList);
}

function displayToDoList(obj, index) {
	var displaySection;
	if (index %2 === 0) {
		displaySection = document.querySelector('#main1');
	} else {
		displaySection = document.querySelector('#main2');
	}
	var eachTask = obj.tasks.map((elem, index) => `<input type="checkbox" id="" class="task-checkbox">${elem}</input>`);
	var allTasks = eachTask.join(' ');
	displaySection.innerHTML = `<article class="todo-list-card" id="${obj.id}">
				<header class="card-header">
				<h2 class="card-title">${obj.title}</h2>
				</header>
				<form class="current-tasks">
				${allTasks}
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

function pageLoad() {
	console.log(allToDoLists);
	// var thing = localStorage.getItem('allToDoLists');
	// Array.from(JSON.parse(localStorage.getItem('allToDoLists')));
	return allToDoLists.map(function(elem, index) {
		return displayToDoList(elem, index);
	});
}

// function findId() {
// 	var 
// }

function deleteToDoList(e) {
	var removableCard = e.target.closest('.todo-list-card');
	var deleteBtn =  e.target.closest('#delete-card');
	if (!deleteBtn) {
		return;
	}
	var closestToDoList = Array.from(deleteBtn.closest('.todo-list-card').children[1].children);
	// iterate over this array and check if each element has a checked property of true
	// if not kick out;
	var uncheckedInputs = closestToDoList.filter(function(elem) {
		return elem.checked === false;	
	});
	if (uncheckedInputs.length) {
		console.log('dont delete');
		return;
	} else {
		removableCard.remove()
		console.log('before', allToDoLists);
		var removedCard = allToDoLists.splice(removableCard.id === allToDoLists.id, 1);
		saveLocalList(allToDoLists);
		console.log('delete', allToDoLists);
	}
	// if unchecked uncheckedInput has a length return;
	// else if uncheckedInput === 0 delete card;

};

// function toggleUrgent() {
// 	if (newList.urgent === false) {
// 		newList.urgent = true;
// 		document.querySelector('#urgent-btn-icon').src = 'check-yo-self-icons/urgent-active.svg';
// 	} else {
// 		newList.urgent = false;
// 		document.querySelector('#urgent-btn-icon').src = 'check-yo-self-icons/urgent.svg';
// 	}
// 	// e.target.classList.toggle('urgent-card')
// }


// articleCard.addEventListener('click', clickArticleCard);


// function clickArticleCard(e) {
// 	e.target.classList.toggle('dan-is-cool')
// }
