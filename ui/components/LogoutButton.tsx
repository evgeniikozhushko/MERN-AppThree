'use client'

import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/auth';

export default function LogoutButton() {
    const router = useRouter();
    const { isAuthenticated, logout, loading } = useAuth();

    const handleLogout = async () => {
        if (!isAuthenticated) return;
        
        try {
            await logout();
            router.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <button disabled className="addButton opacity-50 cursor-not-allowed">Loading...</button>;
    }

    return (
        <button 
            onClick={handleLogout}
            disabled={!isAuthenticated}
            className={`addButton ${
                isAuthenticated 
                    ? 'cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
            }`}
        >
            Logout
        </button>
    );
} 