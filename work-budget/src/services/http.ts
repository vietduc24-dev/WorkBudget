import axios from "axios";

import { ROUTES } from "@/constants/routes";
import type { AuthResponse } from "@/types/auth";
import { HttpStatusCode } from "@/types/common";
import { getToken, removeAuthTokens, setAuthTokens } from "@/utils/cookie";
import type { AxiosError, AxiosInstance } from "axios";

const UNAUTHORIZED_ERROR_URLS = [
  "/auth/login",
  "/auth/register/",
  "/auth/forgot-password/",
  "/auth/first-time-password",
  "/auth/validate-reset-token/?lang=ja",
];

const LOGIN_URL = "/auth/login";
const LOGOUT_URL = "/auth/logout/";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  );
}

export function isAxiosUnauthorizedError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  );
}

class Http {
  instance: AxiosInstance;
  private accessToken: string | null;

  constructor(config?: { baseURL?: string; timeout?: number }) {
    this.accessToken = getToken() || null;
    this.instance = axios.create({
      baseURL:
        config?.baseURL ||
        (typeof window !== "undefined"
          ? "/api/v1"
          : process.env.NEXT_PUBLIC_URL_API || process.env.NEXT_PUBLIC_API_URL),
      timeout: config?.timeout || 40000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ja",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = getToken() || this.accessToken;

        if (token) {
          this.accessToken = token;
          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === LOGIN_URL) {
          const data = response.data as AuthResponse;
          this.accessToken = data.data?.access_token ?? null;
          if (this.accessToken) {
            setAuthTokens(this.accessToken, data.data?.refresh_token);
          }
        } else if (url === LOGOUT_URL) {
          this.accessToken = "";
          removeAuthTokens();
        }

        return response;
      },
      (error: AxiosError) => {
        const url = error.config?.url || "";
        if (
          isAxiosUnauthorizedError(error) &&
          !UNAUTHORIZED_ERROR_URLS.includes(url)
        ) {
          this.accessToken = "";
          removeAuthTokens();
          if (typeof window !== "undefined") {
            window.location.href = ROUTES.LOGIN;
          }
        }

        if (
          error?.response?.status === HttpStatusCode.Forbidden &&
          !UNAUTHORIZED_ERROR_URLS.includes(url)
        ) {
          if (typeof window !== "undefined") {
            window.location.href = ROUTES.FORBIDDEN;
          }
        }

        // if (
        //   process.env.NODE_ENV === 'production' &&
        //   error?.response?.status === HttpStatusCode.InternalServerError
        // ) {
        //   window.location.href = ROUTES.INTERNAL_SERVER_ERROR;
        // }

        return Promise.reject(error.response?.data);
      }
    );
  }
}

const http = new Http().instance;

export default http;
