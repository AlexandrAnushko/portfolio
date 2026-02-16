import { clsx } from "clsx";
import { ButtonMode } from "../types/global";

type Props = {
  onClick?: () => void;
  text?: string;
  mode?: ButtonMode;
  type?: "submit" | "reset" | "button" | undefined;
  extra?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "normal-case";
};

export const Button = ({
  onClick,
  text,
  mode = "primary",
  type = "button",
  extra = "",
  isLoading,
  isDisabled,
  textTransform = "uppercase",
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      type={type}
      className={clsx(
        `${extra} flex items-center justify-center rounded-md focus:ring-white text-white cursor-pointer py-2 px-4 xl:py-3 xl:px-8 
        active:scale-90 transition-all duration-300 ${
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
    </button>
  );
};
