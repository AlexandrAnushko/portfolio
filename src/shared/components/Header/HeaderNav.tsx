"use client";

import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  adminHeaderLinks,
  authorizedHeaderLinks,
  unauthorizedHeaderLinks,
} from "@/shared/constants/routes";
import { Button } from "../Button";
import { Link } from "../Link";
import { LoadingButton } from "../loaders/LoadingButton";

type Props = {
  isAuthorized: boolean | null;
  role: string | null;
  onLogout: () => Promise<void>;
  onSignInOpen: () => void;
  onSignUpOpen: () => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
};

export const HeaderNav = ({
  isAuthorized,
  role,
  onLogout,
  onSignInOpen,
  onSignUpOpen,
  openMobile,
  setOpenMobile,
}: Props) => {
  const pathname = usePathname();
  const isAdmin = role === "ADMIN";
  const links = isAdmin
    ? adminHeaderLinks
    : isAuthorized
      ? authorizedHeaderLinks
      : unauthorizedHeaderLinks;

  return (
    <div className="relative">
      {/* DESKTOP */}
      <nav className="hidden sm:flex sm:gap-8 md:gap-12 items-center">
        {links.map((l) => (
          <Link key={l.href} href={l.href} isActive={pathname === l.href}>
            {l.label}
          </Link>
        ))}

        {isAuthorized === null ? (
          <LoadingButton />
        ) : isAuthorized ? (
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
        {openMobile &&
          createPortal(
            <div className="sm:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-51 flex flex-col p-6 animate-fadeIn">
              <div className="flex justify-end">
                <button
                  onClick={() => setOpenMobile(false)}
                  className="p-2 rounded hover:bg-gray-700 transition"
                >
                  <X className="text-white" size={28} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col items-center gap-6 text-white text-2xl">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpenMobile(false)}
                    isActive={pathname === l.href}
                    mode="hover-text"
                    className="w-32.5 shadow-lg shadow-primary/10"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="flex flex-col w-32.5 gap-4 mt-2">
                  {isAuthorized === null ? (
                    <div className="w-full bg-linear-to-r from-blue-300 to-blue-500 animate-pulse" />
                  ) : !isAuthorized ? (
                    <>
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
                    </>
                  ) : (
                    <Button
                      text="Logout"
                      onClick={onLogout}
                      mode="secondary"
                      className="w-32.5"
                    />
                  )}
                </div>
              </nav>
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
};
