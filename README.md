# Phase 1 Final Project

## Basic To-Do List Web Application

### Description
The **Basic To-Do List Web Application** is a user-friendly and responsive task manager that allows users to create, view, complete, and delete their daily tasks. It uses a mock backend powered by `json-server`, and the API has been deployed to Render.

This project showcases foundational web development skills using **HTML**, **CSS**, and **JavaScript**, along with the use of **Fetch API** for interacting with a backend.

---

### Features
- Add new tasks using a form
- Tasks are stored on a mock backend (`json-server`)
- Tasks load dynamically on page load
- Mark tasks as completed
- Delete tasks from the list and backend
- Filter tasks: All / Completed / Pending
- Each task includes a due date
- Fully responsive layout

---

### Technologies Used
- HTML
- CSS
- JavaScript 
- JSON Server (for local API)
- Render (for backend deployment)
- Git & GitHub

---

## Getting Started Locally

#### 1. Clone the Repository

` ```bash
git clone https://github.com/your-username/todo-list-app.git
cd todo-list-app``` 

### 2. Install json-server

` ```bash
npm install -g json-server

### 3. Start the server

` ```bash
json-server --watch db.json --port 3000

Then open index.html in your browser.

## Deployed Backend (API)

You can access the deployed backend here:
https://todo-list-api-backend-1.onrender.com/tasks

### This endpoint supports:

- GET /tasks
- POST /tasks
- DELETE /tasks/:id
- PATCH /tasks/:id

## Project Structure
- todo-list-app/
- index.html
- style.css
- script.js
- db.json
- README.md

## Author
Oscar Ochanda

## Contact
oscarochanda@gmail.com

## License
This project is an open source and is available under the MIT License









