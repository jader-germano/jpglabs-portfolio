/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isConsultant: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'jader@jpglabs.com.br',
    password: '1wN35b17F903V1@h',
    name: 'Jader Germano',
    role: 'ADMIN',
  },
  {
    id: '2',
    email: 'consultant@jpglabs.com.br',
    password: 'ConsultantFlow2026!',
    name: 'Consultant User',
    role: 'USER_CONSULTANT',
  },
  {
    id: '3',
    email: 'ops@jpglabs.com.br',
    password: 'OpsFlow8082!',
    name: 'Carla Ops',
    role: 'USER_CONSULTANT',
  },
  {
    id: '4',
    email: 'client@jpglabs.com.br',
    password: 'ClientView2026!',
    name: 'Mateus Client',
    role: 'USER',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('jpglabs_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    const matchedUser = MOCK_USERS.find(
      (candidate) => candidate.email.toLowerCase() === email.toLowerCase() && candidate.password === password,
    );

    if (!matchedUser) {
      return false;
    }

    const newUser: User = {
      id: matchedUser.id,
      email: matchedUser.email,
      name: matchedUser.name,
      role: matchedUser.role,
    };
    setUser(newUser);
    localStorage.setItem('jpglabs_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jpglabs_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isConsultant: user?.role === 'USER_CONSULTANT' || user?.role === 'ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
