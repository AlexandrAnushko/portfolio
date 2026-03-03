import { clsx } from "clsx";
import { ButtonMode } from "../types/global";
import { ReactNode } from "react";

type Props = {
  onClick?: () => void;
  text?: string;
  mode?: ButtonMode;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "normal-case";
  size?: "small" | "large";
  rightIcon?: ReactNode;
};

export const Button = ({
  onClick,
  text,
  mode = "primary",
  type = "button",
  className = "",
  isLoading,
  isDisabled,
  textTransform = "uppercase",
  size = "large",
  rightIcon,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      type={type}
      className={clsx(
        `flex items-center justify-center rounded-md focus:ring-white text-white cursor-pointer py-2 px-4
        ${size === "large" ? "xl:py-3 xl:px-8" : "xl:py-2 xl:px-6"} 
        active:scale-90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100
        ${className} ${
          mode === "primary"
            ? "bg-primary"
            : mode === "secondary"
              ? "bg-secondary"
              : "bg-transparent"
        }`,
        {
          "bg-linear-to-r from-blue-400 to-blue-500 animate-pulse": isLoading,
          "hover:bg-primary-accent": mode === "primary",
          "hover:bg-secondary-accent": mode === "secondary",
          "border border-white": mode === "transparent",
          "gap-2": rightIcon,
        },
      )}
    >
      {text && (
        <span
          className={`text-nowrap text-sm xl:text-base font-semibold ${textTransform}`}
        >
          {text}
        </span>
      )}
      {rightIcon && rightIcon}
    </button>
  );
};
