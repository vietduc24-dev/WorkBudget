import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useController } from "react-hook-form";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type RHFInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  withAsterisk?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  leftAddon?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"input">, "name" | "defaultValue" | "value">;

function joinClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(" ");
}

export function RHFInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  withAsterisk,
  containerClassName,
  inputClassName,
  leftAddon,
  id,
  className,
  ...inputProps
}: RHFInputProps<TFieldValues>) {
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
        {leftAddon ? (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            {leftAddon}
          </span>
        ) : null}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={joinClassNames(
            "h-[57px] w-full rounded-[8px] border px-6 text-[14px] outline-none placeholder:text-[#8d8d8d] focus:ring-2 focus:ring-[#9cc3ff]",
            error
              ? "border-[#ef4444] focus:border-[#ef4444]"
              : "border-[#adadad] focus:border-[#4285ff]",
            leftAddon ? "pl-12" : undefined,
            inputClassName,
            className,
          )}
          {...inputProps}
          {...field}
          value={field.value ?? ""}
        />
      </span>
      {error?.message ? (
        <span id={errorId} className="mt-2 block text-[12px] leading-4 text-[#ef4444]">
          {error.message}
        </span>
      ) : null}
    </label>
  );
}
