# Application-Tracker

This application helps users track their job applications, manage notes, and store resumes.  It's a full-stack application with a React frontend and a Node.js/Express backend.

## Features and Functionality

**Application Tracking:**

* Add new job applications, specifying company name, job role, application platform, date applied, and status.
* Update the status of existing applications.
* Delete applications.
* View a list of all applications, sorted by date applied.

**Note Management:**

* Add new notes.
* Delete notes.
* View all notes associated with the user's account.

**Resume Management:**

* Upload resumes (supports various file types).
* View a list of uploaded resumes, displaying the associated role.
* Download uploaded resumes.
* Delete resumes.

**User Authentication:**

* Secure user registration and login.
* Protected routes ensuring only authenticated users can access application data.
* Logout functionality.


## Technology Stack

**Frontend:**

* React
* React Router
* Axios
* Tailwind CSS
* React Hook Form
* React Toastify
* react-loader-spinner

**Backend:**

* Node.js
* Express.js
* Mongoose
* MongoDB
* bcrypt
* JWT (JSON Web Tokens)
* Multer (for file uploads)
* Cookie-parser
* Cors
* Dotenv


## Prerequisites

* Node.js and npm (or yarn) installed on your system.
* MongoDB running locally or a connection string to a remote MongoDB instance.  The backend expects the connection string in the environment variable `DB_URL`.
* A frontend URL in the environment variable `FRONTEND_URL`.


## Installation Instructions

**Backend:**

1. Clone the repository: `git clone https://github.com/sachan13harshit/Application-Tracker.git`
2. Navigate to the backend directory: `cd Application-Tracker/backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the backend directory and add the following (replace with your actual values):
   ```
   DB_URL=YOUR_MONGODB_CONNECTION_STRING
   SECRET_KEY=YOUR_SECRET_KEY
   JWT_SECRET=YOUR_JWT_SECRET
   FRONTEND_URL=YOUR_FRONTEND_URL 
   ```
5. Start the server: `node index.js`


**Frontend:**

1. Navigate to the frontend directory: `cd Application-Tracker/frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the frontend directory and add your backend URL:
   ```
   VITE_BACKEND_URL=YOUR_BACKEND_URL  
   ```
4. Start the development server: `npm run dev`

## API Documentation

The API endpoints are well-documented within the code comments of the controller files (`backend/controller/*.js`).  The main routes are as follows:


**Authentication:**

* `/auth/register`: POST - Register a new user.
* `/auth/login`: POST - Login an existing user.
* `/auth/verify`: GET - Verify user authentication (protected route).
* `/auth/logout`: POST - Logout the current user (protected route).


**Applications:**

* `/application/add`: POST - Add a new application (protected route).
* `/application/rem`: DELETE - Delete an application (protected route).
* `/application/update`: PATCH - Update an application's status (protected route).
* `/application/get`: GET - Get all applications for the current user (protected route).


**Notes:**

* `/note/add`: POST - Add a new note (protected route).
* `/note/delete`: DELETE - Delete a note (protected route).
* `/note/get`: GET - Get all notes for the current user (protected route).


**Resumes:**

* `/resume/add`: POST - Add a new resume (protected route, requires file upload).
* `/resume/get`: GET - Get a list of resume roles for the current user (protected route).
* `/resume/getId`: GET - Download a specific resume (protected route).
* `/resume/del`: DELETE - Delete a resume (protected route).





## Contact/Support Information

For any questions or issues, please open an issue on the GitHub repository.
