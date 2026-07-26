"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { authApi } from "@/api";
import { RHFInput } from "@/components/rhf";
import { getObjectError } from "@/utils/helper";

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const [formError, setFormError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError("");
    setFormMessage("");

    try {
      const response = await authApi.forgotPassword(values);
      setFormMessage(
        response.data.message || "Password reset instructions have been sent.",
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
          <div className="relative min-h-[500px] text-white lg:min-h-0">
            <p className="text-[20px] font-bold leading-[30px]">Your Logo</p>

            <div className="mt-[98px] max-w-[396px]">
              <h1 className="text-[34px] font-semibold leading-[51px]">
                Reset password
              </h1>
              <p className="text-[25px] leading-9">Lorem Ipsum is simply</p>
              <p className="mt-7 max-w-[311px] text-[13px] leading-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Enter your email address and we will send password
                reset instructions.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="absolute left-[38%] top-[86px] hidden h-[280px] w-[330px] lg:block"
            >
              <div className="absolute left-[95px] top-[92px] h-[132px] w-[172px] rounded-[24px] bg-white/95 shadow-[0_20px_50px_rgb(0_61_122_/_20%)]" />
              <div className="absolute left-[118px] top-[126px] h-[18px] w-[126px] rounded-full bg-[#d9ecff]" />
              <div className="absolute left-[118px] top-[160px] h-[18px] w-[88px] rounded-full bg-[#d9ecff]" />
              <div className="absolute left-[138px] top-[35px] h-[94px] w-[92px] rounded-t-[52px] border-[18px] border-white/95 border-b-0" />
              <div className="absolute left-[226px] top-[177px] size-[72px] rounded-full bg-[#ffb25f]" />
              <div className="absolute left-[248px] top-[194px] h-[33px] w-[24px] rounded-[5px] bg-white" />
              <div className="absolute left-[255px] top-[186px] h-[22px] w-[10px] rounded-t-full border-[4px] border-white border-b-0" />
              <div className="absolute left-[44px] top-[52px] h-[26px] w-[44px] rounded-full bg-white/80" />
              <div className="absolute bottom-[12px] right-[14px] h-[24px] w-[44px] rounded-full bg-[#ffd5c5]" />
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
                  Remembered ?
                  <a
                    href="/login"
                    className="block text-[#006dff] hover:text-[#0054c7]"
                  >
                    Sign in
                  </a>
                </p>
              </div>

              <h2 className="mt-2 text-[52px] font-medium leading-[66px]">
                Forgot Password
              </h2>

              <p className="mt-8 max-w-[390px] text-[15px] leading-6 text-[#6b7280]">
                Enter your username or email address. We will send reset
                instructions to help you get back into your account.
              </p>

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
                containerClassName="mt-[51px]"
                inputClassName="border-[#4285ff]"
                rules={{
                  required: "Username or email is required",
                }}
              />

              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mt-[62px] h-[54px] w-full rounded-[8px] bg-[#1095e8] text-[16px] font-semibold leading-6 text-white shadow-[0_12px_24px_rgb(16_149_232_/_24%)] transition hover:bg-[#0b86d2] focus:outline-none focus:ring-2 focus:ring-[#1095e8] focus:ring-offset-2"
              >
                {form.formState.isSubmitting
                  ? "Sending..."
                  : "Reset Password"}
              </button>

              <a
                href="/login"
                className="mt-7 block text-center text-[13px] leading-5 text-[#006dff] hover:text-[#0054c7]"
              >
                Back to Sign in
              </a>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
