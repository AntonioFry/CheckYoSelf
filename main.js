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
var checkMark = document.querySelector('.check-mark');
var toDoCard = document.querySelector('article');

window.addEventListener('load', pageLoad);
addTaskBtn.addEventListener('click', addTask);
asideContainer.addEventListener('click', removePreviewedTasks);
makeToDoList.addEventListener('click', makeNewList);
urgentBtn.addEventListener('click', makeUrgent);
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

function disableMakeNewListBtn(e) {
	if (document.querySelector('#preview-tasks').innerHTML === '') {
		clearAllBtn.disabled = true;
		clearAllBtn.style.backgroundcolor = 'gray';
	}
}

function makeNewList() {
	var newList = new toDoList(Date.now(), titleInput.value, asideTasks);
	allToDoLists.push(newList);
	newList.saveToLocalStorage(allToDoLists);
	document.querySelector('#main1').innerHTML = '';
	document.querySelector('#main2').innerHTML = '';
	allToDoLists.map(function(elem, index) {
		displayToDoList(elem, index)
	});
	clearAll();
}

// function saveLocalList() {
// 	var stringifyToDoList = JSON.stringify(allToDoLists);
// 	localStorage.setItem('allToDoLists', stringifyToDoList);
// }

function displayToDoList(elem, index) {
	var displaySection;
	if (index %2 === 0) {
		displaySection = document.querySelector('#main1');
	} else {
		displaySection = document.querySelector('#main2');
	}
	var eachTask = elem.tasks.map((text, index) => `<input type="checkbox" class="task-checkbox"><label class="checkbox-content">${text}</label><br>`);
	var allTasks = eachTask.join(' ');
	displaySection.innerHTML = `<article class="todo-list-card urgent-card" id="${obj.id}">
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
	disableMakeNewListBtn()
	// var thing = localStorage.getItem('allToDoLists');
	// var thingArray = Array.from(JSON.parse(localStorage.getItem('allToDoLists')));
	// console.log(thingArray)
	var reverseOrder = allToDoLists.reverse();
	return reverseOrder.map(function(elem, index) {
		return displayToDoList(elem, index);
	});
}

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
		allToDoLists.splice(removableCard.id === allToDoLists.id, 1);
		console.log('delete')
	}
	// if unchecked uncheckedInput has a length return;
	// else if uncheckedInput === 0 delete card;
};

function makeUrgent() {
	
}
// articleCard.addEventListener('click', clickArticleCard);


// function clickArticleCard(e) {
// 	e.target.classList.toggle('dan-is-cool')
// }
