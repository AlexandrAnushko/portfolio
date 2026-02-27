"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  authorizedHeaderLinks,
  unauthorizedHeaderLinks,
} from "@/shared/constants/routes";
import { Button } from "../Button";
import { usePathname } from "next/navigation";

type Props = {
  isAuthorized: boolean | null;
  onLogout: () => Promise<void>;
  onSignInOpen: () => void;
  onSignUpOpen: () => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
};

export const HeaderNav = ({
  isAuthorized,
  onLogout,
  onSignInOpen,
  onSignUpOpen,
  openMobile,
  setOpenMobile,
}: Props) => {
  const pathname = usePathname();
  const links = isAuthorized ? authorizedHeaderLinks : unauthorizedHeaderLinks;

  return (
    <div className="relative">
      {/* DESKTOP */}
      <nav className="hidden sm:flex sm:gap-8 md:gap-12 items-center">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-base font-semibold ${pathname === l.href ? "text-primary" : "text-grey-text"} hover:text-secondary transition-colors uppercase whitespace-nowrap`}
          >
            {l.label}
          </Link>
        ))}

        {isAuthorized ? (
          <Button text="Logout" onClick={onLogout} mode="secondary" />
        ) : (
          <div className="flex gap-4">
            <Button text="Sign In" onClick={onSignInOpen} />
            <Button text="Sign Up" onClick={onSignUpOpen} mode="secondary" />
          </div>
        )}
      </nav>

      {/* MOBILE */}
      <div className="sm:hidden">
        <button
          onClick={() => setOpenMobile(true)}
          className="p-2 rounded hover:bg-gray-700 transition"
        >
          <Menu className="text-white" />
        </button>

        {/* Fullscreen overlay */}
        {openMobile && (
          <div className="fixed inset-0 bg-black/99 z-50 flex flex-col p-6 animate-fadeIn">
            <div className="flex justify-end">
              <button
                onClick={() => setOpenMobile(false)}
                className="p-2 rounded hover:bg-gray-700 transition"
              >
                <X className="text-white" size={28} />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-6 text-white text-2xl">
              {!isAuthorized && (
                <div className="flex gap-4 w-full">
                  <Button
                    text="Sign In"
                    onClick={onSignInOpen}
                    className="w-full"
                  />
                  <Button
                    text="Sign Up"
                    onClick={onSignUpOpen}
                    mode="secondary"
                    className="w-full"
                  />
                </div>
              )}

              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpenMobile(false)}
                  className={`${pathname === l.href ? "text-primary" : ""} hover:text-gray-300 transition`}
                >
                  {l.label}
                </Link>
              ))}

              {isAuthorized && (
                <Button
                  text="Logout"
                  onClick={onLogout}
                  mode="secondary"
                  className="max-w-[50%]"
                />
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};
