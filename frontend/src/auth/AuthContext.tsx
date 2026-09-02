import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
} from "../api/backend";

import {
  clearTokens,
  getAccessToken,
} from "./tokenStorage";

type User = {
  id: number;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const accessToken = await getAccessToken();

        if (!accessToken) {
          return;
        }

        const currentUser = await getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        console.error("SESSION RESTORE ERROR:", error);

        await clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(username: string, password: string) {
    await loginUser(username, password);

    const currentUser = await getCurrentUser();

    setUser(currentUser);
  }

  async function logout() {
    await clearTokens();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}