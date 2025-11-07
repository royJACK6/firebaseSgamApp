import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Password admin (in produzione, questo dovrebbe essere gestito dal backend)
const ADMIN_PASSWORD = 'SgamAdmin2024!';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica se l'utente è già autenticato al caricamento
  useEffect(() => {
    const authStatus = sessionStorage.getItem('sgam_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sgam_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sgam_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve essere usato all'interno di AuthProvider");
  }
  return context;
};
