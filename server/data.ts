import bcrypt from 'bcryptjs';

const password = bcrypt.hashSync('password123', 10);

export const users = [
  {
    id: '1',
    email: 'user@example.com',
    password,
    name: 'Test User',
    role: 'user'
  },
  {
    id: '2',
    email: 'admin@example.com',
    password,
    name: 'Admin User',
    role: 'admin'
  }
];