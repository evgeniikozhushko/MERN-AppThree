"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../../lib/api";
import Image from "next/image";

// This is a Next.js Server Component
export default function CreateUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState<string>("");

  type User = {
    _id: string;
    name: string;
    email: string;
  };

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      await createUser(form);
      const res = await getUsers();
      setUsers(res.data);
      setForm({ name: "", email: "" });
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      setError("Could not delete user");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by adding{" "}
            <a
              href="#name-input"
              className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold hover:bg-black/[.1] dark:hover:bg-white/[.1] transition-colors"
            >
              name and an email
            </a>
            .
          </li>
          <li className="tracking-[-.01em]">
            <a
              href="#name-input"
              className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold hover:bg-black/[.1] dark:hover:bg-white/[.1] transition-colors"
            >
              Add User and see your changes instantly.
            </a>
          </li>
        </ol>
        <form onSubmit={handleSubmit}>
          <input
              id="name-input"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button id="add-user-btn" type="submit" className="addButton">
            Add User
          </button>
        </form>
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>Error: {error}</div>
        )}
        <code>List</code>
        <ul className="list">
          {users.map((u) => (
            <div key={u._id} className="flex justify-between items-center">
              <li>
                {u.name} - {u.email}
              </li>
              <button
                className="deleteButton"
                onClick={() => handleDelete(u._id)}
              >
                Delete User
              </button>
            </div>
          ))}
        </ul>
        {/* <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div> */}
      </main>
    </div>
  );
}
