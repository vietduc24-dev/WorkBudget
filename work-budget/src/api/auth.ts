import http from "@/services/http";
import type {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
  VerifyRegistrationPayload,
} from "@/types/auth";

export const authApi = {
  login(payload: LoginPayload) {
    return http.post<AuthResponse>("/auth/login", payload);
  },

  register(payload: RegisterPayload) {
    return http.post<RegisterResponse>("/auth/register/", payload);
  },

  verifyRegistration(payload: VerifyRegistrationPayload) {
    return http.post<AuthResponse>("/auth/verify-registration", payload);
  },

  forgotPassword(payload: ForgotPasswordPayload) {
    return http.post<AuthResponse>("/auth/forgot-password/", payload);
  },
};
