document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterTasksSelect = document.getElementById('filterTasks'); // Added filter dropdown element

    // IMPORTANT: Replace 'https://todo-list-api.onrender.com' with YOUR actual Render API URL after deployment!
    // This is the base URL for your backend API hosted on Render.
   const API_BASE_URL = 'https://todo-list-api-backend-1.onrender.com';
   const TASKS_ENDPOINT = `${API_BASE_URL}/tasks`;

   // const API_BASE_URL = 'https://todo-list-api.onrender.com';
   // const TASKS_ENDPOINT = `${API_BASE_URL}/tasks`;

    // --- Helper function to render a single task to the DOM ---
    function renderTask(task) {
        const listItem = document.createElement('li');
        listItem.dataset.id = task.id; // Store the task ID on the list item for easy reference

        if (task.completed) {
            listItem.classList.add('completed');
        }

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        // Event listener 1: Click on task text to toggle completion status
        taskSpan.addEventListener('click', () => toggleTaskCompleted(task.id, !task.completed));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        // Event listener 2: Click on delete button to remove task
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    }

    // --- Function to fetch and display all tasks from the API ---
    async function fetchAndDisplayTasks() {
        try {
            const response = await fetch(TASKS_ENDPOINT);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const tasks = await response.json();
            taskList.innerHTML = ''; // Clear existing tasks before re-rendering

            // Array iteration: Use forEach to display each task fetched from the API
            tasks.forEach(task => renderTask(task));

        } catch (error) {
            console.error('Error fetching tasks:', error);
            alert('Could not load tasks. Please ensure the backend API is running and accessible.');
        }
    }

    // --- Function to add a new task (POST request to API) ---
    async function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const newTask = {
                text: taskText,
                completed: false,
                dueDate: new Date().toISOString().slice(0, 10) // Example: current date in YYYY-MM-DD
            };

            try {
                const response = await fetch(TASKS_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // If successful, re-fetch and display all tasks to update the UI
                fetchAndDisplayTasks();
                taskInput.value = ''; // Clear the input field
                taskInput.focus();
            } catch (error) {
                console.error('Error adding task:', error);
                alert('Could not add task. Please try again.');
            }
        } else {
            alert('Please enter a task!');
        }
    }

    // --- Function to toggle task completion status (PATCH request to API) ---
    async function toggleTaskCompleted(id, newCompletedStatus) {
        try {
            const response = await fetch(`${TASKS_ENDPOINT}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: newCompletedStatus }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // After successful update, re-fetch and display all tasks to ensure UI is in sync
            fetchAndDisplayTasks();
        } catch (error) {
            console.error(`Error toggling task ${id}:`, error);
            alert('Could not update task status. Please try again.');
        }
    }

    // --- Function to delete a task (DELETE request to API) ---
    async function deleteTask(id) {
        try {
            const response = await fetch(`${TASKS_ENDPOINT}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // After successful delete, re-fetch and display all tasks
            fetchAndDisplayTasks();
        } catch (error) {
            console.error(`Error deleting task ${id}:`, error);
            alert('Could not delete task. Please try again.');
        }
    }

    // --- Function for Filtering Tasks based on dropdown selection ---
    async function filterAndDisplayTasks() {
        const filterType = filterTasksSelect.value;
        try {
            const response = await fetch(TASKS_ENDPOINT);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const allTasks = await response.json();
            let filteredTasks = [];

            // Array iteration: Use filter based on selected option
            if (filterType === 'pending') {
                filteredTasks = allTasks.filter(task => !task.completed);
            } else if (filterType === 'completed') {
                filteredTasks = allTasks.filter(task => task.completed);
            } else { // 'all'
                filteredTasks = allTasks;
            }

            taskList.innerHTML = ''; // Clear and re-render the filtered tasks
            filteredTasks.forEach(task => renderTask(task));

        } catch (error) {
            console.error('Error filtering tasks:', error);
            alert('Could not filter tasks. Please try again.');
        }
    }


    // --- Primary Event Listeners ---

    // Event listener 3: Click event for Add Task button
    addTaskBtn.addEventListener('click', addTask);

    // Event listener 4: Keypress event for Enter key in input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Event listener 5 (distinct type): Change event for the filter dropdown
    // This listener relies on the <select id="filterTasks"> element being present in index.html
    filterTasksSelect.addEventListener('change', filterAndDisplayTasks);


    // --- Initial load of tasks when the page loads ---
    // This function acts as the "render app" part, fetching and displaying the initial state
    fetchAndDisplayTasks();
});