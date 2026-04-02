import { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  type?: HTMLInputTypeAttribute;
  label?: string;
  errorMessage?: string;
  containerClassname?: string;
};

export const FormInput = <T extends FieldValues>({
  name,
  placeholder,
  register,
  type = "text",
  label,
  errorMessage,
  containerClassname,
}: Props<T>) => {
  return (
    <div className={`relative ${containerClassname ? containerClassname : ""}`}>
      {label && (
        <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        {...register(name)}
        className="w-full bg-dark-grey border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
        placeholder={placeholder}
      />
      {errorMessage && (
        <p className="absolute -bottom-[1.5em] right-0 text-red-400 text-sm">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
