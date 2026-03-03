import NextLink from "next/link";
import { ButtonMode } from "../types/global";
import clsx from "clsx";

interface LinkProps {
  text: string;
  href: string;
  mode?: ButtonMode;
  className?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "normal-case";
}

export const Link = ({
  text,
  href,
  mode = "primary",
  className,
  textTransform = "uppercase",
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={clsx(
        `${className} ${textTransform} rounded-md focus:ring-white text-white text-center text-nowrap text-sm xl:text-base font-semibold cursor-pointer py-2 px-4 xl:py-3 xl:px-8 
              active:scale-90 transition-all duration-300 ${
                mode === "primary"
                  ? "bg-primary"
                  : mode === "secondary"
                    ? "bg-secondary"
                    : "bg-transparent"
              }`,
        {
          "hover:bg-primary-accent": mode === "primary",
          "hover:bg-secondary-accent": mode === "secondary",
        },
      )}
    >
      {text}
    </NextLink>
  );
};
