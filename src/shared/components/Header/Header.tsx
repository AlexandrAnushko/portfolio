"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "../antd/Modal";
import { AuthForm } from "@/features/auth/AuthForm";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "@/shared/hooks/useAuth";
import { HeaderNav } from "./HeaderNav";

export const Header = () => {
  const { isAuthorized, refresh } = useAuth();

  const [open, setOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const onSignInOpen = () => {
    setIsSignIn(true);
    setOpen(true);
  };

  const onSignUpOpen = () => {
    setIsSignIn(false);
    setOpen(true);
  };

  const onLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await refresh();
    window.location.href = "/";
  };

  return (
    <header className="flex justify-between items-center p-8">
      <Link href={ROUTES.ROOT}>
        <div className="text-white text-3xl">
          A<span className="text-primary">.</span>
        </div>
      </Link>

      <HeaderNav
        isAuthorized={isAuthorized}
        onLogout={onLogout}
        onSignInOpen={onSignInOpen}
        onSignUpOpen={onSignUpOpen}
      />

      {open && (
        <Modal
          title={isSignIn ? "Sign In" : "Sign Up"}
          centered
          open={open}
          onCancel={() => setOpen(false)}
        >
          <AuthForm
            successText={
              isSignIn ? "Login successful!" : "Registration successful!"
            }
            submitText={isSignIn ? "Sign In" : "Sign Up"}
            apiUrl={isSignIn ? "/api/auth/login" : "/api/auth/register"}
            isLogin={isSignIn}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
    </header>
  );
};
