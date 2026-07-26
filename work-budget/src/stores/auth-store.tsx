"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthTokens } from "@/types";
import {
  getRefreshToken,
  getToken,
  removeAuthTokens,
  setAuthTokens,
} from "@/utils/cookie";

type AuthState = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessExpiresAt: string;
  refreshExpiresAt: string;
  isAuthenticated: boolean;
  setSession: (tokens: AuthTokens) => void;
  clearSession: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState(() => ({
    accessToken: getToken(),
    refreshToken: getRefreshToken(),
    tokenType: "bearer",
    accessExpiresAt: "",
    refreshExpiresAt: "",
  }));

  const value = useMemo<AuthState>(
    () => ({
      ...session,
      isAuthenticated: Boolean(session.accessToken),
      setSession(tokens) {
        setAuthTokens(tokens.access_token, tokens.refresh_token);
        setSessionState({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          tokenType: tokens.token_type,
          accessExpiresAt: tokens.access_expires_at,
          refreshExpiresAt: tokens.refresh_expires_at,
        });
      },
      clearSession() {
        removeAuthTokens();
        setSessionState({
          accessToken: "",
          refreshToken: "",
          tokenType: "bearer",
          accessExpiresAt: "",
          refreshExpiresAt: "",
        });
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
