"use client";

import { RHFInput, RHFInputPassword } from "@/components/rhf";
import { loginValidationRules } from "../_hooks/login.schema";
import { useLogin } from "../_hooks/useLogin";

const socialProviders = [
  {
    name: "Google",
    label: "Sign in with Google",
    className: "w-[298px] justify-center gap-5 bg-[#e9f1ff] text-[#4285f4]",
    icon: "G",
  },
  {
    name: "Facebook",
    label: "Facebook",
    className: "size-[55px] justify-center bg-[#f7f7f7] text-[#1877f2]",
    icon: "f",
  },
  {
    name: "Apple",
    label: "Apple",
    className: "size-[55px] justify-center bg-[#f7f7f7] text-[#1f2937]",
    icon: "a",
  },
];

export function LoginForm() {
  const { form, formError, onSubmit } = useLogin();

  return (
    <main className="min-h-screen overflow-hidden bg-white font-sans text-[#111111]">
      <section className="relative mx-auto min-h-screen w-full max-w-[1440px] bg-white">
        <div className="absolute inset-x-0 top-0 h-[458px] bg-[#1095e8]" />

        <div className="relative z-10 grid min-h-screen grid-cols-1 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_539px] lg:px-[72px] lg:py-[31px]">
          <div className="relative min-h-[660px] pb-10 text-white lg:min-h-0">
            <p className="text-[20px] font-bold leading-[30px]">Your Logo</p>

            <div className="mt-[98px] max-w-[396px]">
              <h1 className="text-[34px] font-semibold leading-[51px]">
                Sign in to
              </h1>
              <p className="text-[25px] leading-9">Lorem Ipsum is simply</p>
              <p className="mt-7 max-w-[311px] text-[13px] leading-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s,
              </p>
            </div>

            <div
              aria-hidden="true"
              className="absolute left-[36%] top-[60px] hidden h-[330px] w-[360px] lg:block"
            >
              <div className="absolute left-[128px] top-[82px] h-[122px] w-[170px] rotate-[24deg] rounded-[55%_45%_50%_50%] bg-gradient-to-br from-[#ffad76] via-[#ff704d] to-[#df4f33] shadow-[0_18px_35px_rgb(14_68_126_/_24%)]" />
              <div className="absolute left-[174px] top-[38px] h-[92px] w-[54px] rounded-full bg-gradient-to-b from-[#ffb48d] to-[#ea5b61]" />
              <div className="absolute left-[214px] top-[80px] h-[12px] w-[68px] rotate-[8deg] rounded-full bg-[#ffe1be]" />
              <div className="absolute left-[192px] top-[18px] size-[20px] rounded-full bg-[#56372d]" />
              <div className="absolute left-[104px] top-[126px] h-[132px] w-[35px] -rotate-[38deg] rounded-b-[28px] rounded-t-[12px] bg-[#182230]" />
              <div className="absolute left-[52px] top-[170px] h-[76px] w-[132px] rounded-full bg-white/90 blur-[1px]" />
              <div className="absolute left-[2px] top-[178px] size-[76px] rounded-full bg-white/75 blur-[1px]" />
              <div className="absolute left-[72px] top-[198px] size-[64px] rounded-full bg-white/70 blur-[1px]" />
              <div className="absolute left-[48px] top-[42px] h-[26px] w-[44px] rounded-full bg-white/80" />
              <div className="absolute bottom-[18px] right-[28px] h-[24px] w-[44px] rounded-full bg-[#ffd5c5]" />
            </div>
          </div>

          <div className="relative z-20 flex items-start justify-center lg:block">
            <form
              onSubmit={onSubmit}
              className="w-full max-w-[539px] rounded-[40px] bg-white px-8 py-10 shadow-[0_20px_80px_rgb(0_0_0_/_8%)] lg:mt-12 lg:h-[741px] lg:px-11 lg:py-11"
            >
              <div className="flex items-start justify-between gap-6">
                <p className="text-[21px] leading-8">
                  Welcome to{" "}
                  <span className="font-semibold text-[#1095e8]">LOREM</span>
                </p>
                <p className="text-[13px] leading-5 text-[#8d8d8d]">
                  No Account ?
                  <a
                    href="/register"
                    className="block text-[#006dff] hover:text-[#0054c7]"
                  >
                    Sign up
                  </a>
                </p>
              </div>

              <h2 className="mt-2 text-[55px] font-medium leading-[83px]">
                Sign in
              </h2>

              {formError ? (
                <p className="mt-4 rounded-[8px] bg-[#fff1f2] px-4 py-3 text-[13px] leading-5 text-[#be123c]">
                  {formError}
                </p>
              ) : null}

              <div className="mt-9 flex flex-wrap gap-[13px]">
                {socialProviders.map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    aria-label={provider.label}
                    className={`flex h-[55px] items-center rounded-[8px] text-[16px] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#1095e8] ${provider.className}`}
                  >
                    <span className="grid size-[29px] place-items-center rounded-full text-[26px] font-bold leading-none">
                      {provider.icon}
                    </span>
                    {provider.name === "Google" ? (
                      <span>{provider.label}</span>
                    ) : null}
                  </button>
                ))}
              </div>

              <RHFInput
                control={form.control}
                name="email"
                type="email"
                label="Enter your username or email address"
                placeholder="Username or email address"
                maxLength={191}
                withAsterisk
                autoFocus
                containerClassName="mt-[51px]"
                inputClassName="border-[#4285ff]"
                rules={loginValidationRules.email}
              />

              <RHFInputPassword
                control={form.control}
                name="password"
                label="Enter your Password"
                placeholder="Password"
                maxLength={50}
                withAsterisk
                containerClassName="mt-[37px]"
                rules={loginValidationRules.password}
              />

              <a
                href="/forgot-password"
                className="mt-3 block text-right text-[13px] leading-5 text-[#006dff] hover:text-[#0054c7]"
              >
                Forgot Password
              </a>

              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mt-[44px] h-[54px] w-full rounded-[8px] bg-[#1095e8] text-[16px] font-semibold leading-6 text-white shadow-[0_12px_24px_rgb(16_149_232_/_24%)] transition hover:bg-[#0b86d2] focus:outline-none focus:ring-2 focus:ring-[#1095e8] focus:ring-offset-2"
              >
                {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
