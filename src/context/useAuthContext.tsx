import { ReactNode, createContext, useContext, useState } from "react";

const AuthContext = createContext<{
  token: string | null;
  removeToken: () => void;
  saveToken: (token: string) => void;
}>({} as any);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [token, setToken] = useState<string | null>(null);

  const removeToken = () => {
    setToken(null);
  }

  const saveToken = (token: string) => {
    setToken(token);
  }
  
  return (
    <AuthContext.Provider
      value={{ token, removeToken, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
}
