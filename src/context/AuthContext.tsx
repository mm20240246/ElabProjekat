import {

  createContext,

  useContext,

  useMemo,

  useState,

  type ReactNode,

} from "react";

import { User } from "../models/User";

import { authService } from "../services/AuthService";

 

type AuthContextValue = {

  currentUser: User | null;

  isAuthenticated: boolean;

  register: (name: string, email: string, password: string) => void;

  login: (email: string, password: string) => boolean;

  logout: () => void;

};

 

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

 

export function AuthProvider({ children }: { children: ReactNode }) {

  const [currentUser, setCurrentUser] = useState<User | null>(

    authService.getCurrentUser()

  );

 

  function register(name: string, email: string, password: string): void {

    const newUser = new User(

      crypto.randomUUID(),

      name.trim(),

      email.trim(),

      password

    );

 

    authService.register(newUser);

  }

 

  function login(email: string, password: string): boolean {

    const loggedUser = authService.login(email.trim(), password);

 

    if (!loggedUser) {

      return false;

    }

 

    setCurrentUser(loggedUser);

    return true;

  }

 

  function logout(): void {

    authService.logout();

    setCurrentUser(null);

  }

 

  const value = useMemo(

    () => ({

      currentUser,

      isAuthenticated: currentUser !== null,

      register,

      login,

      logout,

    }),

    [currentUser]

  );

 

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

 

export function useAuth(): AuthContextValue {

  const context = useContext(AuthContext);

 

  if (!context) {

    throw new Error("useAuth mora biti korišćen unutar AuthProvider-a.");

  }

 

  return context;

}