# Beta Task Manager

**Developer:** Christian Virreira  
**Date:** March 26, 2026  
**Presented to:** Lateral Group  

---

## 📌 Overview

This software is a beta project designed to demonstrate how a task managing tool would work for a single user. Please note that tasks are not linked to a specific user account, so it is not designed to support multiple users simultaneously.

> **⚠️ Warning:** This application should **not** be used in production. There is no authentication or authorization to prevent misuse or abuse of the frontend. Additionally, the backend has open API endpoints accessible to any software due to a widely open CORS configuration.

## ✨ Features

The application assumes the user has a list of tasks and needs to differentiate between pending and finished tasks, with the ability to add new ones along the way. 

* **Add Tasks:** Create new tasks on the fly.
* **Complete Tasks:** Click the **Mark as finished** button to immediately move a pending task to the finished tasks list.
* **Revert Tasks:** Finished tasks can be returned to the pending list by clicking the **Mark as pending** button.
* **Delete Tasks:** If a task is no longer needed, it can be permanently removed by clicking the **Delete** button (requires confirmation).
* **Sorting:** Tasks are displayed chronologically, with the oldest tasks at the top and the newest tasks at the bottom.

> **Note:** There is currently no limit on the number of tasks displayed. Future versions should implement pagination to prevent overflow errors or performance slowdowns.

## 🛠 Tech Stack

* **Backend:** C# with .NET Core 10 (Minimal API mode)
* **Frontend:** React 19 with React Bootstrap
* **Database:** SQLite (managed by the backend using Entity Framework)

---

## 🚀 Project Configuration

To get started, clone the project repository to your local machine:

```bash
git clone [https://github.com/Eazael/lateral-group-2026.git](https://github.com/Eazael/lateral-group-2026.git)
```

Inside the cloned repository, you will find a README.md file and two main directories:

* **/backend - Contains the C# backend code.

* **/frontend - Contains the React frontend code.

## 1. Backend Configuration
You must configure and start the backend first, otherwise the frontend will have no data to display.

Open the solution file located at backend/backend.csproj using Visual Studio.

Create the SQLite database by running the Entity Framework migrations. Open your terminal or Package Manager Console and execute:

```Bash
dotnet ef database update
```

Once the database is created, start the application by running it in Debug or Release mode from within Visual Studio.

## 2. Frontend Configuration
Open the /frontend directory using Visual Studio Code.

Install the required Node.js dependencies by running:

```Bash
npm install
```
Start the development server by executing:

```Bash
npm run dev
```
Access the provided local URL in your browser.

Note: If the backend is not running, the frontend will display the following error message: Failed to fetch.