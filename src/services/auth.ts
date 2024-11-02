import { z } from 'zod';
import { apiClient } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'jury' | 'admin';
  photo?: string;
}

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    // Pour la démonstration, nous simulons différents types d'utilisateurs
    if (email === 'admin@example.com' && password === 'password123') {
      const adminUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin' as const
      };
      return { user: adminUser, token: 'demo-token-admin' };
    }

    if (email === 'jury@example.com' && password === 'password123') {
      const juryUser = {
        id: '2',
        name: 'Jury Member',
        email: 'jury@example.com',
        role: 'jury' as const
      };
      return { user: juryUser, token: 'demo-token-jury' };
    }

    // Dans une vraie application, nous ferions un appel API ici
    throw new Error('Identifiants invalides');
  },

  register: async (data: any): Promise<{ user: User; token: string }> => {
    // Simuler l'enregistrement d'un candidat
    const response = await apiClient.post('/auth/register', {
      ...data,
      role: 'candidate',
      status: 'pending'
    });
    return response.data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async (): Promise<User | null> => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
};