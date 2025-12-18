import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/health';

const AUTH_KEY = 'health_tracker_auth';
const USERS_KEY = 'health_tracker_users';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY);
    if (storedAuth) {
      setUser(JSON.parse(storedAuth));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    const usersData = localStorage.getItem(USERS_KEY);
    const users: (User & { password: string })[] = usersData ? JSON.parse(usersData) : [];
    
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  }, []);

  const signup = useCallback((email: string, password: string, name: string): { success: boolean; error?: string } => {
    const usersData = localStorage.getItem(USERS_KEY);
    const users: (User & { password: string })[] = usersData ? JSON.parse(usersData) : [];
    
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    
    const newUser: User & { password: string } = {
      id: crypto.randomUUID(),
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  return { user, isLoading, login, signup, logout, isAuthenticated: !!user };
}
