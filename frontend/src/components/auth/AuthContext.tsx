import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import AuthService from "./AuthService";
import { User } from "oidc-client-ts";

const AuthContext = createContext(null!);

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(
    JSON.parse(
      sessionStorage.getItem(
        `oidc.user:${process.env.REACT_APP_AUTHORITY}:${process.env.REACT_APP_CLIENT_ID}`
      ) || "null"
    ) || undefined
  );

  const authService = new AuthService();

  const loginCallback = async (): Promise<void> => {
    const authedUser = await authService.loginCallback();
    console.log("authedUser:", authedUser);
    setUser(authedUser);
  };

  const login = async (): Promise<void> => {
    try {
      await authService.login();
      console.log("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (process.env.REACT_APP_OIDC_PROVIDER === "Cognito") {
        await cognitoLogout();
      } else await authService.logout();

      console.log("Logout successful!");
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  const cognitoLogout = async () => {
    const endSessionEndpoint = `${process.env.REACT_APP_COGNITO_DOMAIN}/logout`;
    const cb = encodeURIComponent(`${process.env.REACT_APP_CLIENT_BASE_URL}`);
    const url = `${endSessionEndpoint}?client_id=${process.env.REACT_APP_CLIENT_ID}&logout_uri=${cb}`;

    window.open(url, "_self");
    sessionStorage.removeItem(
      `oidc.user:${process.env.REACT_APP_AUTHORITY}:${process.env.REACT_APP_CLIENT_ID}`
    );
    setUser(null);
  };

  const value = { user, login, logout, loginCallback, cognitoLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
