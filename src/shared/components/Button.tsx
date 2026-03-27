import { cn } from "../utils/cn";
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
  size?: "small" | "large" | "xl";
  rightIcon?: ReactNode;
  rounded?: string;
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
  rounded = "rounded-lg",
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      type={type}
      className={cn(
        {
          "bg-linear-to-r from-blue-400 to-blue-500 animate-pulse": isLoading,
          "bg-primary hover:bg-primary-hover text-asphalt shadow-primary/20":
            mode === "primary",
          "bg-secondary hover:bg-secondary-hover text-white shadow-secondary/20":
            mode === "secondary",
          "border-2 border-primary bg-transparent text-primary hover:text-asphalt hover:bg-primary":
            mode === "outline",
          "border border-white/10 bg-dark-bg hover:bg-dark-bg-hover text-gray-300 shadow-sm":
            mode === "dark",
          "bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20":
            mode === "danger",
          "bg-transparent border border-primary text-primary":
            mode === "transparent",
          "gap-2": rightIcon,
        },
        `flex items-center justify-center focus:ring-white cursor-pointer py-2 px-4 xl:py-2 xl:px-6 hover:opacity-80
        active:scale-90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100
        shadow-lg ${rounded} ${className}`,
        {
          "xl:py-3": size === "large",
          "xl:py-4": size === "xl",
        },
      )}
    >
      {text && (
        <span
          className={cn(
            `text-nowrap text-sm xl:text-base font-semibold ${textTransform}`,
            {
              "font-medium": mode === "dark",
            },
          )}
        >
          {text}
        </span>
      )}
      {rightIcon && rightIcon}
    </button>
  );
};
