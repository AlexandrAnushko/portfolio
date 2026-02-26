"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "../antd/Modal";
import { AuthForm } from "@/features/auth/AuthForm";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "@/shared/hooks/useAuth";
import { HeaderNav } from "./HeaderNav";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { isAuthorized, refresh } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
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
    router.replace("/");
  };

  return (
    <header className="flex justify-between items-center px-4 py-2 sm:px-8 sm:py-6">
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
        openMobile={openMobile}
        setOpenMobile={setOpenMobile}
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
            onClose={() => {
              setOpen(false);
              setOpenMobile(false);
            }}
          />
        </Modal>
      )}
    </header>
  );
};
