# MERN Blog Platform

A full-stack blog platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This project provides a complete API and a responsive user interface for user authentication and blog post management.

 <!-- Optional: Add a screenshot of your running app -->

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Authentication Routes](#authentication-routes)
  - [Post Routes](#post-routes)
- [Deployment](#deployment)
- [License](#license)

## Features

- **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
- **Full CRUD for Posts**: Authenticated users can Create, Read, Update, and Delete their own blog posts.
- **Public Read Access**: All visitors can view the list of posts and read individual posts.
- **Authorization**: Strict rules ensure that users can only edit or delete posts they have authored.
- **Soft Deletion**: Posts are marked as "deleted" in the database instead of being permanently removed, preserving data integrity.
- **Responsive Frontend**: A clean and modern user interface built with React that works on all screen sizes.
- **Centralized API Service**: A dedicated service layer in the frontend for managing all API interactions.
- **Custom Error Handling**: Robust error handling on both the backend and frontend for a smooth user experience.

## Tech Stack

- **Backend**:
  - **Node.js**: JavaScript runtime environment.
  - **Express.js**: Web application framework for Node.js.
  - **MongoDB**: NoSQL database for storing user and post data.
  - **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
  - **jsonwebtoken (JWT)**: For creating and verifying access tokens.
  - **bcryptjs**: For hashing user passwords securely.
  - **dotenv**: For managing environment variables.
- **Frontend**:
  - **React**: JavaScript library for building user interfaces.
  - **Vite**: Modern frontend build tool for fast development.
  - **React Router**: For declarative routing in the React application.
  - **Axios**: Promise-based HTTP client for making API requests.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally.

## Getting Started

Follow these steps to get your development environment set up.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/WasiullahSahito/BlogPlatform.git
    cd BlogPlatform
    ```

### Backend Setup

2.  **Navigate to the backend directory and install dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Create an environment file:**
    Copy the example environment file and update it if necessary. The default values are configured for local development.
    ```bash
    cp .env.example .env
    ```
    Your `backend/.env` file will look like this:
    ```
    PORT=5001
    MONGO_URI=mongodb://localhost:27017/mern-blog
    JWT_SECRET=a_very_strong_secret_key_12345
    ```

### Frontend Setup

4.  **Navigate to the frontend directory and install dependencies:**
    (From the root `mern-blog-platform` directory)
    ```bash
    cd frontend
    npm install
    ```

5.  **Create a local environment file for the frontend:**
    This tells your React app where to find the backend API.
    ```bash
    cp .env.local.example .env.local
    ```
    Your `frontend/.env.local` file will contain:
    ```
    VITE_API_URL=http://localhost:5001
    ```

## Running the Application

You will need two separate terminal windows to run both the backend and frontend servers simultaneously.

1.  **Start the Backend Server:**
    - Open a terminal in the `backend` directory.
    - Run the command:
      ```bash
      npm run server
      ```
    - The API will be running on `http://localhost:5001`.

2.  **Start the Frontend Development Server:**
    - Open a second terminal in the `frontend` directory.
    - Run the command:
      ```bash
      npm run dev
      ```
    - The React application will open in your browser, typically at `http://localhost:5173`.

## API Endpoints

The backend provides the following RESTful API endpoints.

### Authentication Routes

| Method | Route                  | Description              | Access |
| :----- | :--------------------- | :----------------------- | :----- |
| `POST` | `/api/auth/register`   | Register a new user      | Public |
| `POST` | `/api/auth/login`      | Authenticate a user & get token | Public |

### Post Routes

| Method   | Route           | Description                             | Access   |
| :------- | :-------------- | :-------------------------------------- | :------- |
| `GET`    | `/api/posts`    | Get all non-deleted posts               | Public   |
| `POST`   | `/api/posts`    | Create a new post                       | Private  |
| `GET`    | `/api/posts/:id`| Get a single post by its ID             | Public   |
| `PUT`    | `/api/posts/:id`| Update a post (owner only)              | Private  |
| `DELETE` | `/api/posts/:id`| Soft delete a post (owner only)         | Private  |

_**Private** routes require a valid JWT in the `Authorization: Bearer <token>` header._

## Deployment

This application is ready for deployment on platforms like Render (for the backend) and Vercel (for the frontend).

-   **Backend (Render)**:
    -   Connect your GitHub repository.
    -   Set the **Root Directory** to `backend`.
    -   Use `npm install` as the build command and `npm start` as the start command.
    -   Add your `MONGO_URI` and `JWT_SECRET` as environment variables.
-   **Frontend (Vercel)**:
    -   Connect your GitHub repository.
    -   Set the **Root Directory** to `frontend`.
    -   Add an environment variable `VITE_API_URL` and set its value to your deployed backend URL (e.g., `https://your-api.onrender.com`).

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
