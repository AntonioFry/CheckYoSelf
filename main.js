// Phase 1
// 	Creating new To-dos:
// 		- Should be able to add new tasks using the add item form
// 			- Query the input and button within the form
// 			- create a function that gets the input

var asideTasks = [];
var allToDoLists = [];
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
mainSection.addEventListener('click', makeUrgent);
clearAllBtn.addEventListener('click', clearAll);
mainSection.addEventListener('click', deleteToDoList);
// xmainSection.addEventListener('click', getId);

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

// function disableMakeNewListBtn(e) {
// 	if (document.querySelector('#preview-tasks').innerHTML === '') {
// 		clearAllBtn.disabled = true;
// 		clearAllBtn.style.backgroundColor = '#aaaa';
// 	} else {
// 		clearAllBtn.disabled = false
// 		clearAllBtn.style.backgroundColor = '#1f1f3d'
// 	}
// }

function makeNewList() {
	var newList = new toDoList(Date.now(), titleInput.value, asideTasks);
	allToDoLists.push(newList);
	newList.saveToLocalStorage(allToDoLists);
	// document.querySelector('#main1').innerHTML = '';
	// document.querySelector('#main2').innerHTML = '';
	// allToDoLists.map(function(elem, index) {
	// 	return displayToDoList(elem, index)
	// });
	displayToDoList(newList)
	clearAll();
}

function displayToDoList(elem) {
	// if (index %2 === 0) {
	// 	displaySection = document.querySelector('#1main');
	// } else {
	// 	displaySection = document.querySelector('#main2');
	// }
	var eachTask = elem.tasks.map((text, index) => `<input type="checkbox" class="task-checkbox"><label class="checkbox-content">${text}</label></br>`);
	var allTasks = eachTask.join(' ');
	mainSection.innerHTML = `<article class="todo-list-card" data-id="${elem.id}">
				<header class="card-header">
				<h2 class="card-title">${elem.title}</h2>
				</header>
				<form class="current-tasks">
				${allTasks}
				</form>
				<footer class="card-footer">
				<div class="urgent-btn">
				<img src="check-yo-self-icons/
				urgent.svg">
				<label class="urgent-label">URGENT</label>
				</div>
				<div id="delete-card">
				<img src="check-yo-self-icons/delete.svg">
				<label class="delete-label">DELETE</label>
				</div>
				</footer>
				</article>` + mainSection.innerHTML;
}

function pageLoad() {
	// disableMakeNewListBtn()
	// var thing = localStorage.getItem('allToDoLists');
	// var listLocalStorage = Array.from(JSON.parse(localStorage.getItem('allToDoLists')));
	var newObj = JSON.parse(localStorage.getItem('allToDoLists'));
	for (var i = 0; i < newObj.length; i++) {
		var card = new toDoList(newObj[i].id, newObj[i].title, newObj[i].tasks, newObj[i].urgent);
		allToDoLists.push(card);
		displayToDoList(card);
	}
	console.log(allToDoLists);

	// (function(elem, index) {
	// 	return displayToDoList();
	// });
}

function getId(e) {
	var targetCard = e.target.closest('.todo-list-card');
	var specificId = parseInt(targetCard.getAttribute('data-id'));
	var listLocation = allToDoLists.findIndex(function(i) {
		return i.id  === specificId;
	});
	return listLocation;
}

function deleteToDoList(e) {
	var i = getId(e);
	var removableCard = e.target.closest('.todo-list-card');
	var deleteBtn =  e.target.closest('#delete-card');
	if (!deleteBtn) {
		return;
	}
	var closestToDoList = Array.from(deleteBtn.closest('.todo-list-card').children[1].children);
	var uncheckedInputs = closestToDoList.filter(function(elem) {
		return elem.checked === false;	
	});
	if (uncheckedInputs.length) {
		console.log('dont delete');
		return;
	} else {
		removableCard.remove()
		allToDoLists.splice(i, 1);
		updateLocalStorage()
	}
};

function makeUrgent(e) {
	var urgentBtn = e.target.closest(urgentBtn);
	if (!urgentBtn) {
		return
	}
	e.target.classList.toggle('#urgent-card')
	console.log(newList)
}


function updateLocalStorage() {
	var stringifyToDoList = JSON.stringify(allToDoLists);
	localStorage.setItem('allToDoLists', stringifyToDoList);
}

// articleCard.addEventListener('click', clickArticleCard);


// function clickArticleCard(e) {
// 	e.target.classList.toggle('dan-is-cool')
// }
