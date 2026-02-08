import NextLink from "next/link";

interface LinkProps {
  text: string;
  href: string;
  bgColor: string;
}

export const Link = ({ text, href, bgColor }: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={`px-5 py-2 text-white rounded-md ${bgColor} hover:opacity-90 transition-opacity hover:outline-zinc-200 hover:outline`}
    >
      {text}
    </NextLink>
  );
};
