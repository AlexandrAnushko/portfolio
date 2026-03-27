"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onCancel: () => void;
  children?: React.ReactNode;
  title?: string;
};

export const Modal = ({ children, open, onCancel, title }: Props) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-52 flex items-center justify-center`}>
      <div
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onCancel}
      />
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-[#1f1f1f] p-6 shadow-xl">
        {title && (
          <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};
