//  Nooooooo  //
//  改変や複製を一切禁止します。  //
//  https://github.com/Nooooooo-0328/ToDo  //

let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const newTask = {
            text: taskInput.value.trim(),
            date: getCurrentDate()
        };

        tasks.push(newTask);
        saveTasksToLocalStorage(); 
        taskInput.value = '';
        updateTaskList(taskList);
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage(); 
    const taskList = document.getElementById('taskList');
    updateTaskList(taskList);
}

function updateTaskList(taskList) {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.id = `task-${index}`;
        listItem.classList.add('show');

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.innerText = task.text;
        taskText.addEventListener('click', () => editTask(index));

        const dateSpan = document.createElement('span');
        dateSpan.classList.add('date');
        dateSpan.innerText = task.date;

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerText = '削除';
        deleteButton.addEventListener('click', () => deleteTask(index));

        optionsDiv.appendChild(deleteButton);
        taskContainer.appendChild(taskText);
        taskContainer.appendChild(dateSpan);
        taskContainer.appendChild(optionsDiv);
        listItem.appendChild(taskContainer);
        taskList.appendChild(listItem);
    });
}

function editTask(index) {
    const newText = prompt('タスクを編集してください:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        saveTasksToLocalStorage();
        const taskList = document.getElementById('taskList');
        updateTaskList(taskList);
    }
}

function getCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('ja-JP', options);
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    tasks = storedTasks ? JSON.parse(storedTasks) : [];
    updateTaskList(document.getElementById('taskList'));
}

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
