import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'owner' | 'editor';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthContextValue {
  user?: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>();

  const login = async (email: string, password: string) => {
    // TODO: call API
    setUser({ id: '1', email, role: 'owner' });
  };

  const signup = async (email: string, password: string) => {
    // TODO: call API
    setUser({ id: '1', email, role: 'owner' });
  };

  const logout = async () => {
    // TODO: call API
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
