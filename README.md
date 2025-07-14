# MERN User Management App

This is a full-stack user management application built with the **MERN** stack:

- **MongoDB** (database)
- **Express.js** (backend API)
- **React** (frontend, using Next.js)
- **Node.js** (runtime)

It features user registration, login, authentication, and a dashboard to view users. Authentication state is managed globally in the frontend for seamless UI updates.

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