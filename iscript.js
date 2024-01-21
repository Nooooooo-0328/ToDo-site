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
        listItem.innerHTML = `
            <div class="task-container">
                <span class="task-text">${task.text}</span>
                <span class="date">${task.date}</span>
                <div class="options">
                    <button class="delete-button" onclick="deleteTask(${index})">削除</button>
                </div>
            </div>
        `;
        taskList.appendChild(listItem);

        setTimeout(() => {
            listItem.classList.add('show');
        }, 0);
    });
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
