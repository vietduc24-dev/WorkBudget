"use client";

import Image from "next/image";
import { Header, Sidebar } from "@/components/layout";
import { Icon } from "@/components/ui";
import { UserProfileField } from "./_components/UserProfileField";
import { UserProfileUpload } from "./_components/UserProfileUpload";
import { useMe } from "./_hooks/useMe";

const tabs = ["My details", "Profile", "Password", "Team", "Plan", "Billing", "Email", "Notifications"];

export function UserPage() {
  const { errorMessage, fetchMe, isLoading, profile } = useMe();
  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="app-root">
      <div className="app-shell">
        <Sidebar />
        <section className="dashboard-content">
          <Header />
          <div className="user-settings-page">
            <section className="user-cover">
              {profile.coverUrl ? (
                <Image alt="" className="object-cover" fill priority src={profile.coverUrl} />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,#c9d8ef_0%,#f8d7e8_48%,#f6efe4_100%)]" />
              )}
            </section>

            <section className="user-profile-header">
              <div className="flex min-w-0 items-end gap-8">
                <div className="user-avatar">
                  {profile.avatarUrl ? (
                    <Image alt={profile.fullName} className="object-cover" fill src={profile.avatarUrl} />
                  ) : (
                    <span>{initials || "U"}</span>
                  )}
                </div>
                <div className="min-w-0 pb-7">
                  <h1 className="text-[28px] font-semibold text-[var(--ink)]">Settings</h1>
                  <p className="mt-1 truncate text-sm text-[var(--muted)]">{profile.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pb-7">
                <button className="h-10 rounded-[10px] border border-[#dfe5f0] bg-white px-4 text-sm font-medium text-[var(--ink)]" type="button">
                  Cancel
                </button>
                <button className="h-10 rounded-[10px] bg-[var(--primary)] px-5 text-sm font-medium text-white" onClick={() => void fetchMe()} type="button">
                  Save
                </button>
              </div>
            </section>

            <nav className="user-tabs" aria-label="Settings sections">
              {tabs.map((tab, index) => (
                <button className={index === 0 ? "text-[var(--primary)]" : "text-[var(--muted)]"} key={tab} type="button">
                  {tab}
                </button>
              ))}
            </nav>

            {errorMessage ? (
              <div className="mt-8 max-w-[640px] rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <section className="user-settings-form" aria-busy={isLoading}>
              <div className="grid gap-6 md:grid-cols-2">
                <UserProfileField label="First name" value={isLoading ? "Loading..." : profile.firstName} />
                <UserProfileField label="Last name" value={isLoading ? "Loading..." : profile.lastName} />
              </div>

              <div className="user-section-divider" />

              <UserProfileField
                icon={<Icon className="h-4 w-4" name="messages" />}
                label="Email"
                value={isLoading ? "Loading..." : profile.email}
              />

              <div className="user-section-divider" />

              <UserProfileUpload />

              <UserProfileField label="Role" value={isLoading ? "Loading..." : profile.role} />
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
