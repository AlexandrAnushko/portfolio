import { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  type?: HTMLInputTypeAttribute;
};

export const FormInput = <T extends FieldValues>({
  name,
  placeholder,
  register,
  type = "text",
}: Props<T>) => {
  return (
    <input
      type={type}
      id={name}
      {...register(name)}
      className="w-full bg-dark-grey border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
      placeholder={placeholder}
    />
  );
};
