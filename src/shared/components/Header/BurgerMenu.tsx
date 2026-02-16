"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { burgerMenuLinks } from "@/shared/constants/routes";

export const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <div className="relative">
      {/* DESKTOP */}
      <div className="hidden md:block">
        <div className="relative group">
          <button className="p-2 rounded hover:bg-gray-700 transition">
            <Menu className="text-white" />
          </button>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-40 bg-black text-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            {burgerMenuLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block px-4 py-2 hover:bg-gray-800"
              >
                {l.label}
              </Link>
            ))}

            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-800"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded hover:bg-gray-700 transition"
        >
          <Menu className="text-white" />
        </button>

        {/* Fullscreen overlay */}
        {open && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col p-6 animate-fadeIn">
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded hover:bg-gray-700 transition"
              >
                <X className="text-white" size={28} />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-6 text-white text-2xl">
              {burgerMenuLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-gray-300 transition"
                >
                  {l.label}
                </Link>
              ))}

              <button
                onClick={onLogout}
                className="text-left hover:text-gray-300 transition"
              >
                Выйти
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};
