import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authAPI } from '../services/api'; 

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');

    if (token) {
      authAPI.getCurrentUser()
        .then((userData) => {
          const user: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
          };
          setUser(user);
          sessionStorage.setItem('user', JSON.stringify(user)); 
        })
        .catch(() => {
          // Token inválido ou expirado
          sessionStorage.removeItem('authToken');
          sessionStorage.removeItem('user');
          setUser(null);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      const { token } = response;

      // 1. Salvar token
      sessionStorage.setItem('authToken', token);

      // 2. Buscar usuário (O Interceptor agora vai pegar o token que acabamos de salvar)
      const userData = await authAPI.getCurrentUser();
      
      const loggedUser: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      };

      setUser(loggedUser);
      sessionStorage.setItem('user', JSON.stringify(loggedUser));
    } catch (error: any) {
      const message = error.response?.data?.non_field_errors?.[0] || error.response?.data?.detail || 'Credenciais inválidas';
      throw new Error(message);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
        await authAPI.register(name, email, password);
        await login(email, password);
    } catch (error: any) {
      if (error.response) {
        const message = error.response?.data?.password?.[0] || error.response?.data?.email?.[0] || error.response?.data?.detail || 'Erro ao registrar usuário';
        throw new Error(message);
      } else {
        throw error;
      }
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}