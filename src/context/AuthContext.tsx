import { createContext, useState, type ReactNode, useEffect } from "react";

import { type User, type AuthContextType } from "../features/auth/authActions";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  async function login(email: string, password: string) {
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();

      const loggedUser: User = {
        email,
        token: data.token,
      };

      setUser(loggedUser);
      localStorage.setItem("auth", JSON.stringify(loggedUser));

      return null;
    } catch (err) {
      return err instanceof Error ? err.message : "Unknown error";
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("auth");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
