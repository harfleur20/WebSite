import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import type { User } from '../types/roles';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ user: User }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    // Simulation des comptes de démonstration
    const demoAccounts = {
      'admin@example.com': {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin' as const,
        password: 'password123'
      },
      'jury@example.com': {
        id: '2',
        name: 'Jury Member',
        email: 'jury@example.com',
        role: 'jury' as const,
        password: 'password123'
      },
      'candidate@example.com': {
        id: '3',
        name: 'Test Candidate',
        email: 'candidate@example.com',
        role: 'candidate' as const,
        password: 'password123'
      }
    };

    const account = demoAccounts[email as keyof typeof demoAccounts];

    if (account && account.password === password) {
      const { password: _, ...userData } = account;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success(`Connecté en tant que ${userData.role}`);
      return { user: userData };
    }

    throw new Error('Identifiants invalides');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Déconnexion réussie');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};