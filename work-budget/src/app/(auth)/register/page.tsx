"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { authApi } from "@/api";
import { RHFInput, RHFInputPassword } from "@/components/rhf";
import { getObjectError } from "@/utils/helper";
const recentUsers = [
  {
    name: "John peter",
    active: "Active 1 days ago",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "Alina shmen",
    active: "Active 4 days ago",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  },
];

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const [formError, setFormError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError("");
    setFormMessage("");

    try {
      const registerResponse = await authApi.register(values);
      const verificationToken =
        registerResponse.data.data?.verification_token;

      if (!verificationToken) {
        setFormMessage(
          registerResponse.data.message || "Registration created.",
        );
        return;
      }

      const verifyResponse = await authApi.verifyRegistration({
        email: values.email,
        verification_token: verificationToken,
      });

      setFormMessage(
        verifyResponse.data.message || "Registration verified successfully.",
      );
    } catch (error) {
      setFormError(getObjectError(error)[0]?.message || "An error occurred");
    }
  });

  return (
    <main className="min-h-screen overflow-hidden bg-white font-sans text-[#111111]">
      <section className="relative mx-auto min-h-screen w-full max-w-[1440px] bg-white">
        <div className="absolute inset-x-0 top-0 h-[458px] bg-[#1095e8]" />

        <div className="relative z-10 grid min-h-screen grid-cols-1 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_539px] lg:px-[72px] lg:py-[31px]">
          <div className="relative min-h-[660px] pb-10 text-white lg:min-h-0">
            <p className="text-[20px] font-bold leading-[30px]">Your Logo</p>

            <div className="mt-[98px] max-w-[396px]">
              <h1 className="text-[34px] font-semibold leading-[51px]">
                Sign Up to
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

            <div className="mt-[177px] max-w-[321px] text-[#111111] lg:mt-[268px]">
              <p className="text-[16px] leading-6">Login as</p>
              <div className="mt-[26px] grid grid-cols-2 gap-[31px]">
                {recentUsers.map((user) => (
                  <button
                    type="button"
                    key={user.name}
                    className="relative h-[164px] rounded-[8px] bg-[#eff8ff] px-4 pt-6 text-center transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1095e8]"
                  >
                    <span className="absolute right-2 top-2 grid size-[13px] place-items-center rounded-full border border-[#8f98a3] text-[10px] leading-none text-[#6b7280]">
                      x
                    </span>
                    <span
                      aria-hidden="true"
                      className="mx-auto block size-[76px] rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${user.image})` }}
                    />
                    <span className="mt-2 block text-[16px] font-semibold leading-[23px]">
                      {user.name}
                    </span>
                    <span className="block text-[13px] leading-5 text-[#a0a7b1]">
                      {user.active}
                    </span>
                  </button>
                ))}
              </div>
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
                  Have an Account ?
                  <a
                    href="/login"
                    className="block text-[#006dff] hover:text-[#0054c7]"
                  >
                    Sign in
                  </a>
                </p>
              </div>

              <h2 className="mt-2 text-[55px] font-medium leading-[83px]">
                Sign up
              </h2>

              {formError ? (
                <p className="mt-4 rounded-[8px] bg-[#fff1f2] px-4 py-3 text-[13px] leading-5 text-[#be123c]">
                  {formError}
                </p>
              ) : null}

              {formMessage ? (
                <p className="mt-4 rounded-[8px] bg-[#ecfdf5] px-4 py-3 text-[13px] leading-5 text-[#047857]">
                  {formMessage}
                </p>
              ) : null}

              <RHFInput
                control={form.control}
                name="email"
                type="email"
                label="Enter your username or email address"
                placeholder="Username or email address"
                maxLength={191}
                withAsterisk
                autoFocus
                containerClassName="mt-9"
                inputClassName="border-[#4285ff]"
                rules={{
                  required: "Username or email is required",
                }}
              />

              <RHFInput
                control={form.control}
                name="name"
                type="text"
                label="Name"
                placeholder="example_name"
                maxLength={50}
                withAsterisk
                containerClassName="mt-[37px]"
                rules={{
                  required: "Name is required",
                }}
              />

              <RHFInputPassword
                control={form.control}
                name="password"
                label="Enter your Password"
                placeholder="Password"
                maxLength={50}
                withAsterisk
                containerClassName="mt-[33px]"
                rules={{
                  required: "Password is required",
                }}
              />

              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mt-[62px] h-[54px] w-full rounded-[8px] bg-[#1095e8] text-[16px] font-semibold leading-6 text-white shadow-[0_12px_24px_rgb(16_149_232_/_24%)] transition hover:bg-[#0b86d2] focus:outline-none focus:ring-2 focus:ring-[#1095e8] focus:ring-offset-2"
              >
                {form.formState.isSubmitting ? "Signing up..." : "Sign up"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
