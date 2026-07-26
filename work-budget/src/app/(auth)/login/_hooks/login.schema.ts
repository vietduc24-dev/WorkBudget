export type LoginFormValues = {
  email: string;
  password: string;
};

export const loginDefaultValues: LoginFormValues = {
  email: "",
  password: "",
};

export const loginValidationRules = {
  email: {
    required: "Username or email is required",
  },
  password: {
    required: "Password is required",
  },
} as const;
