'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (res.ok) {
                router.push('/');
            } else {
                const data = await res.json();
            setError(data.message || 'Login failed'); 
            }
        } catch {
                setError('Network error. Please try again.');
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

                <h1>Please login</h1>

                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <input 
                        type="email"    
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder="Email" 
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Password" 
                    />
                    <button type="submit" className="addButton">
                        Login
                    </button>
                </form>

                {error && (
                    <div style={{ color: "red", marginTop: "10px" }}>Error: {error}</div>
                )}

                <div className="text-center">
                    <p>Don&apos;t have an account? <a href="/register" style={{color: 'rgb(127, 255, 212)', textDecoration: 'underline'}}>Register here</a></p>
                </div>
            </main>
        </div>
    );
}