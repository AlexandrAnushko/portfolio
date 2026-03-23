"use client";

import { useState } from "react";
import { Link } from "../Link";
import { signOut } from "next-auth/react";
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
    await signOut({ redirect: false });
    await refresh();
    router.replace("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-asphalt/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl 2xl:max-w-500 mx-auto px-8 py-4 flex items-center justify-between">
        <Link href={ROUTES.ROOT}>
          <div className="text-2xl font-bold text-primary">A.</div>
        </Link>
        <HeaderNav
          isAuthorized={isAuthorized}
          onLogout={onLogout}
          onSignInOpen={onSignInOpen}
          onSignUpOpen={onSignUpOpen}
          openMobile={openMobile}
          setOpenMobile={setOpenMobile}
        />
      </div>
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
