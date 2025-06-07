import React, { createContext, useContext, useState } from 'react';
import * as auth from '../services/auth';

export type UserRole = 'owner' | 'editor';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthContextValue {
  user?: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>();

  const login = async (email: string, password: string) => {
    const u = await auth.login(email, password);
    setUser(u);
  };

  const signup = async (email: string, password: string, name?: string) => {
    const u = await auth.signup(email, password, name);
    setUser(u);
  };

  const resetPassword = async (email: string) => {
    await auth.resetPassword(email);
  };

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const logout = async () => {
    await auth.logout();
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, resetPassword, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
