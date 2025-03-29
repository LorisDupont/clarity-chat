
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'student' | 'teacher';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isTeacher: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'student@example.com',
    role: 'student'
  },
  {
    id: '2',
    name: 'Prof. Thomas Bernard',
    email: 'teacher@example.com',
    role: 'teacher'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('clarity_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // For demo purposes, we'll just match against our mock users
    const foundUser = MOCK_USERS.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('clarity_user', JSON.stringify(foundUser));
    } else {
      throw new Error("Identifiants invalides");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('clarity_user');
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // In a real app, this would make an API call to create a new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role
    };
    
    setUser(newUser);
    localStorage.setItem('clarity_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isTeacher: user?.role === 'teacher',
        login, 
        logout,
        register
      }}
    >
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
