'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our authentication context
interface AuthContextType {
  isAuthenticated: boolean;        // Whether user is currently logged in
  user: { id: string } | null;     // Current user data (null if not authenticated)
  loading: boolean;                // Whether we're checking authentication status
  logout: () => Promise<void>;     // Function to log out the user
  checkAuth: () => Promise<void>;  // Function to check current auth status
}

// Create React context for authentication state
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get API base URL from environment or fallback to localhost
// TODO: Replace with your actual Render backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://appthree.onrender.com';

/**
 * AuthProvider Component
 * 
 * This component wraps the entire application and provides authentication state
 * to all child components. It manages:
 * - User authentication status
 * - Current user data
 * - Loading states during auth checks
 * - Logout functionality
 * 
 * Usage: Wrap your app with <AuthProvider> in the root layout
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // Local state for authentication management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * checkAuth Function
   * 
   * Verifies if the user is currently authenticated by making a request
   * to the backend's /api/auth/me endpoint. This function:
   * - Checks for existing session cookies
   * - Updates authentication state based on response
   * - Handles errors gracefully
   */
  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        credentials: 'include'  // Include cookies for session authentication
      });
      
      if (response.ok) {
        // User is authenticated - get user data and update state
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // User is not authenticated - clear state
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      // Network error or other issue - assume not authenticated
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      // Always stop loading regardless of outcome
      setLoading(false);
    }
  };

  /**
   * logout Function
   * 
   * Logs out the current user by:
   * - Calling the backend logout endpoint to clear server-side session
   * - Clearing local authentication state
   * - This triggers re-renders in all components using useAuth
   */
  const logout = async () => {
    try {
      // Call backend to invalidate session
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      
      // Clear local state immediately
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Check authentication status when component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  // Provide authentication state and functions to all child components
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth Hook
 * 
 * Custom hook that provides access to the authentication context.
 * Components can use this to:
 * - Check if user is authenticated: const { isAuthenticated } = useAuth()
 * - Get current user data: const { user } = useAuth()
 * - Log out: const { logout } = useAuth()
 * - Check loading state: const { loading } = useAuth()
 * 
 * @throws Error if used outside of AuthProvider
 * @returns AuthContextType - authentication state and functions
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * fetchWithAuth Utility Function
 * 
 * Helper function for making authenticated API requests.
 * Automatically includes credentials and JSON headers.
 * 
 * @param url - The API endpoint to call
 * @param options - Additional fetch options
 * @returns Promise<Response> - The fetch response
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    return fetch(url, {
        ...options,
        credentials: 'include',  // Include cookies for authentication
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
    })
}