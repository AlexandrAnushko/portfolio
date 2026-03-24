import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  text?: string;
  children?: ReactNode;
};
export const SocialLink = ({ href, text, children }: Props) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-x-2 group text-base xl:text-lg text-white hover:text-primary transition-colors"
    >
      {children}
      {text}
    </Link>
  );
};
