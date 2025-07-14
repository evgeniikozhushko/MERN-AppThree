# MERN User Management App

This is a full-stack user management application built with the **MERN** stack:

- **MongoDB** (database)
- **Express.js** (backend API)
- **React** (frontend, using Next.js)
- **Node.js** (runtime)

It features user registration, login, authentication, and a dashboard to view users. Authentication state is managed globally in the frontend for seamless UI updates.

---

## How It Works

This web app allows users to register, log in, and manage user accounts in a secure environment. Only authenticated users can view the list of registered users. The app demonstrates a typical authentication flow and user management system found in modern web applications.

- **Authentication:** Users can create an account, log in, and log out. The app uses secure session cookies to keep users logged in.
- **User Dashboard:** After logging in, users can see a dashboard with a list of all registered users.
- **Protected Data:** The user list and management features are only visible to authenticated users. Logging out immediately hides this data.

---

## Main Features & Guide

- **Register:**
  - Go to the Register page and create a new account with your name, email, and password.
- **Login:**
  - Use your credentials to log in. Successful login redirects you to the dashboard.
- **Dashboard:**
  - Once logged in, you’ll see a welcome message and a list of users. You can view basic info (name, email) for each user.
- **Manage Users:**
  - (If implemented) You can add, edit, or delete users from the dashboard.
- **Logout:**
  - Click the Logout button to securely end your session. The user list and dashboard will be hidden until you log in again.

---

## Features

- User registration and login
- Secure authentication with sessions/cookies
- View a list of users (only when authenticated)
- Logout with instant UI update
- Modern React frontend (Next.js App Router)
- Backend API with Express.js

---

## Project Structure

```
appThree/
  backend/      # Express.js API and MongoDB models
  ui/           # Next.js (React) frontend
```

---

## Getting Started

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd appThree
```

### 2. Install dependencies

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd ../ui
npm install
```

### 3. Set up environment variables

- **Backend:**  
  Create a `.env` file in `backend/` with your MongoDB URI and any secrets needed.

  Example:
  ```
  MONGO_URI=mongodb://localhost:27017/your-db
  SESSION_SECRET=your_secret
  PORT=5001
  ```

- **Frontend:**  
  Usually no special env needed unless you want to set API URLs.

### 4. Run the app

#### Start the backend

```sh
cd backend
npm start
```

#### Start the frontend

```sh
cd ../ui
npm run dev
```

- Backend runs on [http://localhost:5001](http://localhost:5001)
- Frontend runs on [http://localhost:3000](http://localhost:3000)

---

## Usage

- Register a new user or log in.
- Once logged in, you can view the user list and manage users.
- Click **Logout** to end your session and hide protected data.

---

## Development Notes

- Make sure `node_modules/` is in your `.gitignore` (do not commit dependencies).
- Authentication state is managed globally in the frontend using React Context.
- Backend uses session cookies for authentication.

---

## License

MIT