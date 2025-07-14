"use client";
import { useEffect, useState } from "react";
import { getUsers } from "../lib/api";
import { useAuth } from "../utils/auth";
import Image from "next/image";

// Get API base URL from environment or fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

type User = {
  _id: string;
  name: string;
  email: string;
};

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState("checking...");
  const [statussColor, setStatusColor] = useState("orange");
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      // Only fetch users if authenticated
      getUsers()
        .then((res) => setUsers(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`);
        if (response.ok) {
          setSystemStatus("Online");
          setStatusColor("green");
        } else {
          setSystemStatus("Offline");
          setStatusColor("red");
        }
      } catch {
        setSystemStatus("Offline");
        setStatusColor("red");
      }
    };
    checkBackend();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={38}
          priority
        />

        <h1>Welcome to your user management dashboard, {user?.id || 'Guest'}</h1>

        <div className="flex flex-row gap-2">
          <a href="/create" className="addButton text-center">
            Manage Users
          </a>
          <a href="/login" className="addButton text-center">
            Login
          </a>
          <a href="/register" className="addButton text-center">
            Register
          </a>
        </div>

        <div className="text-start">
          <p>
            <strong>System Status: </strong>
            <span style={{ color: statussColor }}>{systemStatus}</span>
          </p>
          {isAuthenticated && (
            <p>
              <strong>Total Users:</strong>{" "}
              {loading ? "Loading..." : users.length}
            </p>
          )}
        </div>

        {isAuthenticated && !loading && users.length > 0 && (
          <div>
            <code>Recent Users: {users.length}</code>
            <ul className="list">
              {users.slice(0, 5).map((user) => (
                <div
                  key={user._id}
                  className="flex justify-between items-center"
                >
                  <li>
                    {user.name} - {user.email}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}

        {!isAuthenticated && !loading && (
          <div>
            <p>Please log in to view user information.</p>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
