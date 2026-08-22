import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { authApi, LoginPayload, RegisterPayload } from '../api/auth';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'taskflow_token';
const USER_KEY = 'taskflow_user';

function loadStoredUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadStoredUser());

  const persistSession = useCallback((token: string, u: User) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const res = await authApi.login(payload);
      persistSession(res.token, { userId: res.userId, name: res.name, email: res.email });
    },
    [persistSession]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const res = await authApi.register(payload);
      persistSession(res.token, { userId: res.userId, name: res.name, email: res.email });
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
