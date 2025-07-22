document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterTasksSelect = document.getElementById('filterTasks');

    const API_BASE_URL = 'https://todo-list-api-backend-1.onrender.com';
    const TASKS_ENDPOINT = `${API_BASE_URL}/tasks`;

    function renderTask(task) {
        const listItem = document.createElement('li');
        listItem.dataset.id = task.id;
        if (task.completed) listItem.classList.add('completed');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        taskSpan.addEventListener('click', () => toggleTaskCompleted(task.id, !task.completed));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    }

    async function fetchAndDisplayTasks() {
        try {
            const response = await fetch(TASKS_ENDPOINT);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const tasks = await response.json();
            taskList.innerHTML = '';
            tasks.forEach(task => renderTask(task));
        } catch (err) {
            alert('Could not load tasks. Is your backend deployed?');
        }
    }

    async function addTask() {
        const text = taskInput.value.trim();
        if (!text) return alert('Please enter a task!');
        const newTask = {
            text,
            completed: false,
            dueDate: new Date().toISOString().slice(0, 10),
        };

        try {
            const res = await fetch(TASKS_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            });
            if (!res.ok) throw new Error();
            fetchAndDisplayTasks();
            taskInput.value = '';
            taskInput.focus();
        } catch {
            alert('Failed to add task');
        }
    }

    async function toggleTaskCompleted(id, completed) {
        try {
            const res = await fetch(`${TASKS_ENDPOINT}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            });
            if (!res.ok) throw new Error();
            fetchAndDisplayTasks();
        } catch {
            alert('Failed to update task');
        }
    }

    async function deleteTask(id) {
        try {
            const res = await fetch(`${TASKS_ENDPOINT}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            fetchAndDisplayTasks();
        } catch {
            alert('Failed to delete task');
        }
    }

    async function filterAndDisplayTasks() {
        const filter = filterTasksSelect.value;
        try {
            const response = await fetch(TASKS_ENDPOINT);
            const tasks = await response.json();
            const filtered = filter === 'completed' ? tasks.filter(t => t.completed)
                             : filter === 'pending' ? tasks.filter(t => !t.completed)
                             : tasks;
            taskList.innerHTML = '';
            filtered.forEach(renderTask);
        } catch {
            alert('Filter failed');
        }
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', e => { if (e.key === 'Enter') addTask(); });
    filterTasksSelect.addEventListener('change', filterAndDisplayTasks);
    fetchAndDisplayTasks();
});
