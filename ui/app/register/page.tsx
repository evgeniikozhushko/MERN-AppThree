'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Get API base URL from environment or fallback to Render backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://appthree.onrender.com';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            if (res.ok) {
                router.push('/');
            } else {
                const data = await res.json();
                setError(data.message || 'Registration failed');
            }
        } catch {
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-10 gap-8 sm:p-8 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={100}
                    height={38}
                    priority
                />

                <h1>Please register</h1>

                <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
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
                        Register
                    </button>
                </form>

                {error && (
                    <div style={{ color: "red", marginTop: "10px" }}>Error: {error}</div>
                )}

                <div className="text-center">
                    <p>Already have an account? <a href="/login" style={{color: 'rgb(127, 255, 212)', textDecoration: 'underline'}}>Login here</a></p>
                </div>
            </main>
        </div>
    );
}