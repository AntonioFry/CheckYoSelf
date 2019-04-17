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
var urgentBtn = document.querySelector('.urgent-btn');
var clearAllBtn = document.querySelector('#clear-task-btn');
var mainSection = document.querySelector('main');
var checkMark = document.querySelector('.check-mark');
var toDoCard = document.querySelector('article');
var searchBar = document.querySelector('#header-search-bar');

window.addEventListener('load', pageLoad);
addTaskBtn.addEventListener('click', addTask);
asideContainer.addEventListener('click', removePreviewedTasks);
makeToDoList.addEventListener('click', makeNewList);
mainSection.addEventListener('click', makeUrgent);
clearAllBtn.addEventListener('click', clearAll);
mainSection.addEventListener('click', deleteToDoList);
mainSection.addEventListener('click', getId);
searchBar.addEventListener('keyup', filterSearch);

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

function filterSearch(e) {
	for (var i = 0; i < allToDoLists.length; i++) {
    	var dataIdKey = `[data-id = "${allToDoLists[i].id}"]`;
    	var card = document.querySelector(dataIdKey);
    	if (allToDoLists[i].tasks.includes(searchBar.value) === true || allToDoLists[i].title.includes(searchBar.value) === true) {
     		card.style.display = "block";
   		} else if (allToDoLists[i].tasks.includes(searchBar.value) === false || allToDoLists[i].title.includes(searchBar.value) === false) {
      		card.style.display = "none";
		}
	}
}

function makeNewList() {
	var newList = new toDoList(Date.now(), titleInput.value, asideTasks);
	allToDoLists.push(newList);
	newList.saveToLocalStorage(allToDoLists);
	displayToDoList(newList)
	clearAll();
}

function displayToDoList(elem) {
	var eachTask = elem.tasks.map((text, index) => `<input type="checkbox" class="task-checkbox"><label class="checkbox-content">${text}</label></br>`);
	var allTasks = eachTask.join(' ');
	mainSection.innerHTML = `<article class="todo-list-card card-${elem.urgent}" data-id="${elem.id}">
				<header class="card-header card-${elem.urgent}">
				<h2 class="card-title">${elem.title}</h2>
				</header>
				<form class="current-tasks card-${elem.urgent}">
				${allTasks}
				</form>
				<footer class="card-footer card-${elem.urgent}">
				<div class="urgent-btn">
				<img src="check-yo-self-icons/
				urgent.svg">
				<label class="urgent-label ${elem.urgent}">URGENT</label>
				</div>
				<div id="delete-card">
				<img src="check-yo-self-icons/delete.svg">
				<label class="delete-label">DELETE</label>
				</div>
				</footer>
				</article>` + mainSection.innerHTML;
}

function pageLoad() {
	var newObj = JSON.parse(localStorage.getItem('allToDoLists'));
	for (var i = 0; i < newObj.length; i++) {
		var card = new toDoList(newObj[i].id, newObj[i].title, newObj[i].tasks, newObj[i].urgent);
		allToDoLists.push(card);
		displayToDoList(card);
	}
	console.log(allToDoLists);
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
	var index = getId(e);
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
		return;
	} else {
		removableCard.remove()
		allToDoLists.splice(index, 1);
		updateLocalStorage()
	}
};

function toggleUrgentStyle(e) {
	var toDoCard = e.target.closest('.todo-list-card');
	var index = getId(e);
	var obj = allToDoLists[index];
	toDoCard.childNodes[0].className = `todo-list-card card-${obj.urgent}`;
	toDoCard.childNodes[1].className = `card-header card-${obj.urgent}`;
	toDoCard.childNodes[3].className = `current-tasks card-${obj.urgent}`;
	toDoCard.childNodes[5].className = `card-footer card-${obj.urgent}`;
	toDoCard.childNodes[5].childNodes[1].childNodes[3].className = `urgent-label ${obj.urgent}`;
}

function makeUrgent(e) {
	var urgentBtn = e.target('.urgent-btn');
	var index = getId(e)
	if (!urgentBtn) {
		return
	}
	allToDoLists[i].toggleUrgent(e);
	toggleUrgentStyle(e);
	allToDoLists[i].updateLocalStorage(e);
}


function updateLocalStorage() {
	var stringifyToDoList = JSON.stringify(allToDoLists);
	localStorage.setItem('allToDoLists', stringifyToDoList);
}