"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  authorizedHeaderLinks,
  unauthorizedHeaderLinks,
} from "@/shared/constants/routes";
import { Button } from "../Button";

type Props = {
  isAuthorized: boolean | null;
  onLogout: () => Promise<void>;
  onSignInOpen: () => void;
  onSignUpOpen: () => void;
};

export const HeaderNav = ({
  isAuthorized,
  onLogout,
  onSignInOpen,
  onSignUpOpen,
}: Props) => {
  const [open, setOpen] = useState(false);
  const links = isAuthorized ? authorizedHeaderLinks : unauthorizedHeaderLinks;

  return (
    <div className="relative">
      {/* DESKTOP */}
      <nav className="hidden sm:flex sm:gap-8 md:gap-12 items-center">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-base font-semibold text-grey-text hover:text-secondary transition-colors uppercase whitespace-nowrap"
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
          onClick={() => setOpen(true)}
          className="p-2 rounded hover:bg-gray-700 transition"
        >
          <Menu className="text-white" />
        </button>

        {/* Fullscreen overlay */}
        {open && (
          <div className="fixed inset-0 bg-black/99 z-50 flex flex-col p-6 animate-fadeIn">
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
                  className="hover:text-gray-300 transition"
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
