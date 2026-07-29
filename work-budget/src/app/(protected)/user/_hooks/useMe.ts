"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { authApi } from "@/api";
import type { MeResponse, MeUser } from "@/types";
import { getObjectError } from "@/utils/helper";

export type UserProfileViewModel = {
  avatarUrl?: string;
  coverUrl?: string;
  email: string;
  firstName: string;
  fullName: string;
  lastName: string;
  role: string;
};

const emptyProfile: UserProfileViewModel = {
  email: "",
  firstName: "",
  fullName: "Unknown user",
  lastName: "",
  role: "",
};

function getRoleName(role: MeUser["role"]) {
  if (!role) return "";
  return typeof role === "string" ? role : role.name ?? "";
}

function splitName(name?: string) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

function normalizeMe(response?: MeResponse): UserProfileViewModel {
  const user = response?.data ?? response?.user;
  if (!user) return emptyProfile;

  const fallbackName = splitName(user.name);
  const firstName = user.first_name ?? fallbackName.firstName;
  const lastName = user.last_name ?? fallbackName.lastName;
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || user.name || emptyProfile.fullName;

  return {
    avatarUrl: user.avatar_url,
    coverUrl: user.cover_url,
    email: user.email ?? "",
    firstName,
    fullName,
    lastName,
    role: user.job_title ?? getRoleName(user.role),
  };
}

export function useMe() {
  const [profile, setProfile] = useState<UserProfileViewModel>(emptyProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMe = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await authApi.me();
      setProfile(normalizeMe(response.data));
    } catch (error) {
      setErrorMessage(getObjectError(error)[0]?.message || "Failed to load profile.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadMe() {
      try {
        const response = await authApi.me();
        if (isActive) {
          setProfile(normalizeMe(response.data));
        }
      } catch (error) {
        if (isActive) {
          setErrorMessage(getObjectError(error)[0]?.message || "Failed to load profile.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadMe();

    return () => {
      isActive = false;
    };
  }, []);

  return useMemo(
    () => ({
      errorMessage,
      fetchMe,
      isLoading,
      profile,
    }),
    [errorMessage, fetchMe, isLoading, profile],
  );
}
