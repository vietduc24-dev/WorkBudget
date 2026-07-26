"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { authApi } from "@/api";
import { useAuth } from "@/stores";
import { getObjectError } from "@/utils/helper";
import { loginDefaultValues } from "./login.schema";
import type { LoginFormValues } from "./login.schema";
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/constants/routes";

export function useLogin() {
  const router = useRouter();
  const { setSession } = useAuth();
  const [formError, setFormError] = useState("");
  const form = useForm<LoginFormValues>({
    defaultValues: loginDefaultValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError("");

    try {
      const response = await authApi.login({
        ...values,
      });
      if (response.data.data) {
        setSession(response.data.data);
        router.push(ROUTES.DASHBOARD);
      }
    } catch (error) {
      setFormError(getObjectError(error)[0]?.message || "An error occurred");
    }
  });

  return {
    form,
    formError,
    onSubmit,
  };
}
