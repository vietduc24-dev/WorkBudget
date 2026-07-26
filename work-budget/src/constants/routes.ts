export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  FORBIDDEN: "/403",
  INTERNAL_SERVER_ERROR: "/500",
  DASHBOARD: "/dashboard",
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
 
];

export const WHITELIST_ROUTES = [
  ROUTES.FORBIDDEN,
  ROUTES.INTERNAL_SERVER_ERROR,
];
