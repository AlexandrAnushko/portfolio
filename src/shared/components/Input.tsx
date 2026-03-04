import { Path, UseFormRegister } from "react-hook-form";
import { cn } from "@/shared/utils/cn";
import { InputHTMLAttributes } from "react";

type InputProps<T extends object> = InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  name: Path<T>;
  type?: "text" | "email" | "password" | "number";
  register: UseFormRegister<T>;
  error?: string;
  disabled?: boolean;
  className?: string;
  classNameContainer?: string;
};

export const Input = <T extends object>({
  placeholder,
  name,
  type = "text",
  register,
  error,
  disabled,
  className,
  classNameContainer,
  ...rest
}: InputProps<T>) => (
  <div className={cn("relative", classNameContainer)}>
    <input
      id={String(name)}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      aria-describedby={`${String(name)}-error ${String(name)}-description`}
      aria-invalid={!!error}
      {...register(name)}
      data-slot="input"
      className={cn(
        "border border-gray-200 rounded text-black placeholder:text-gray-500 w-full min-w-0 bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        error && "border-red-500 focus:border-red-500",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      {...rest}
    />
    {error && (
      <div
        id={`${String(name)}-error`}
        className="absolute left-5 top-[-40] z-10 bg-black rounded-sm p-2"
      >
        <p className="text-red-500 px-3 whitespace-nowrap">{error}</p>
      </div>
    )}
  </div>
);
