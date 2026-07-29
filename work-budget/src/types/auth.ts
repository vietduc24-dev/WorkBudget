export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type VerifyRegistrationPayload = {
  email: string;
  verification_token: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type AuthTokens = {
  token_type: string;
  access_token: string;
  refresh_token: string;
  access_expires_at: string;
  refresh_expires_at: string;
};

export type AuthResponse = {
  success?: boolean;
  message?: string;
  data?: AuthTokens;
};

export type MeUser = {
  id?: string | number;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string | { name?: string };
  job_title?: string;
  avatar_url?: string;
  cover_url?: string;
};

export type MeResponse = {
  success?: boolean;
  message?: string;
  data?: MeUser;
  user?: MeUser;
};

export type RegisterResponse = {
  success?: boolean;
  message?: string;
  data?: {
    user_id: string;
    registration_id: string;
    status: "pending" | "verified" | string;
    verification_token: string;
    expires_at: string;
  };
};
