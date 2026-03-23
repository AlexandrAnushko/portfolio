import NextLink from "next/link";
import type { LinkProps } from "next/link";
import { ButtonMode } from "../types/global";
import clsx from "clsx";
import { ReactNode, AnchorHTMLAttributes } from "react";

interface Props extends Omit<LinkProps, "href"> {
  children: ReactNode;
  href: string;
  mode?: ButtonMode;
  className?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "normal-case";
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  isActive?: boolean;
}

export const Link = ({
  children,
  href,
  mode = "text",
  className = "",
  textTransform = "uppercase",
  isActive,
  ...rest
}: Props) => {
  return (
    <NextLink
      href={href}
      className={clsx(
        {
          "bg-primary hover:bg-primary-hover text-asphalt border-2 border-primary":
            mode === "primary",
          "bg-secondary hover:bg-secondary-hover text-white":
            mode === "secondary",
          "border-2 border-primary bg-transparent text-primary hover:text-asphalt hover:bg-primary":
            mode === "outline",
          "bg-transparent text-primary": mode === "transparent",
          "text-gray-400": mode === "text",
          "hover:text-white": mode === "text" && !isActive,
          "text-primary hover:opacity-80": mode === "text" && isActive,
          "py-2 px-4 xl:py-4 xl:px-8": mode !== "text",
        },
        `${textTransform} rounded-lg focus:ring-white text-center text-nowrap text-sm xl:text-base font-semibold cursor-pointer 
          active:scale-90 transition-all duration-300 whitespace-nowrap ${className}`,
      )}
      {...rest}
    >
      {children}
    </NextLink>
  );
};
