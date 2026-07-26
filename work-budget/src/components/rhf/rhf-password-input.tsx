"use client";

import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { useController } from "react-hook-form";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type RHFInputPasswordProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  withAsterisk?: boolean;
  containerClassName?: string;
  inputClassName?: string;
} & Omit<
  ComponentPropsWithoutRef<"input">,
  "name" | "type" | "defaultValue" | "value"
>;

function joinClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(" ");
}

export function RHFInputPassword<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  withAsterisk,
  containerClassName,
  inputClassName,
  id,
  className,
  ...inputProps
}: RHFInputPasswordProps<TFieldValues>) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });
  const inputId = id ?? name;
  const errorId = `${inputId}-error`;

  return (
    <label
      htmlFor={inputId}
      className={joinClassNames("block text-[16px] leading-6", containerClassName)}
    >
      {label}
      {withAsterisk ? <span className="ml-1 text-[#ef4444]">*</span> : null}
      <span className="relative mt-[14px] block">
        <input
          id={inputId}
          type={isVisible ? "text" : "password"}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={joinClassNames(
            "h-[57px] w-full rounded-[8px] border px-6 pr-14 text-[14px] outline-none placeholder:text-[#8d8d8d] focus:ring-2 focus:ring-[#9cc3ff]",
            error
              ? "border-[#ef4444] focus:border-[#ef4444]"
              : "border-[#adadad] focus:border-[#4285ff]",
            inputClassName,
            className,
          )}
          {...inputProps}
          {...field}
          value={field.value ?? ""}
        />
        <button
          type="button"
          aria-label={isVisible ? "Hide password" : "Show password"}
          onClick={() => setIsVisible((value) => !value)}
          className="absolute right-4 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-[12px] font-semibold text-[#8d8d8d] transition hover:bg-[#f2f6ff] hover:text-[#1095e8] focus:outline-none focus:ring-2 focus:ring-[#9cc3ff]"
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </span>
      {error?.message ? (
        <span id={errorId} className="mt-2 block text-[12px] leading-4 text-[#ef4444]">
          {error.message}
        </span>
      ) : null}
    </label>
  );
}

export const RHFPasswordInput = RHFInputPassword;
