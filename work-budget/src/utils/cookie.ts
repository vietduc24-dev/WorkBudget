const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export function getToken() {
  if (typeof document === "undefined") {
    return "";
  }

  const token =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${TOKEN_KEY}=`))
      ?.split("=")[1] ?? "";

  return decodeURIComponent(token);
}

export function getRefreshToken() {
  if (typeof document === "undefined") {
    return "";
  }

  const token =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${REFRESH_TOKEN_KEY}=`))
      ?.split("=")[1] ?? "";

  return decodeURIComponent(token);
}

export function setToken(token: string, maxAge = 2592000) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(
    token,
  )}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function setRefreshToken(token: string, maxAge = 2592000) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${REFRESH_TOKEN_KEY}=${encodeURIComponent(
    token,
  )}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function setAuthTokens(accessToken: string, refreshToken?: string) {
  setToken(accessToken);

  if (refreshToken) {
    setRefreshToken(refreshToken);
  }
}

export function removeToken() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

export function removeRefreshToken() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${REFRESH_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

export function removeAuthTokens() {
  removeToken();
  removeRefreshToken();
}
