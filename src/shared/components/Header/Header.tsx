"use client";

import { useState } from "react";
import Link from "next/link";
// import { Button } from "../antd/Button";
import { Modal } from "../antd/Modal";
import { AuthForm } from "@/features/auth/AuthForm";
import {
  authorizedHeaderLinks,
  ROUTES,
  unauthorizedHeaderLinks,
} from "../../constants/routes";
import { BurgerMenu } from "./BurgerMenu";
import { Button } from "../Button";

type Props = { isAuthorized: boolean };

export const Header = ({ isAuthorized }: Props) => {
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
    window.location.href = "/";
  };

  return (
    <header className="flex justify-between items-center p-8">
      <Link href={ROUTES.ROOT}>
        <div className="text-white text-3xl">
          A<span className="text-primary">.</span>
        </div>
      </Link>
      <nav className="flex gap-12 items-center">
        {(isAuthorized ? authorizedHeaderLinks : unauthorizedHeaderLinks).map(
          (l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-base font-semibold text-grey-text hover:text-secondary transition-colors uppercase whitespace-nowrap"
            >
              {l.label}
            </Link>
          ),
        )}

        {isAuthorized ? (
          <Button text="Logout" onClick={onLogout} mode="secondary" />
        ) : (
          <div className="flex gap-4">
            <Button text="Sign In" onClick={onSignInOpen} />
            <Button text="Sign Up" onClick={onSignUpOpen} mode="secondary" />
          </div>
        )}
      </nav>

      <Modal
        title={isSignIn ? "Вход" : "Регистрация"}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <AuthForm
          successText={
            isSignIn ? "Авторизация успешна!" : "Регистрация успешна!"
          }
          submitText={isSignIn ? "Войти" : "Зарегистрироваться"}
          apiUrl={isSignIn ? "/api/auth/login" : "/api/auth/register"}
          isLogin={isSignIn}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </header>
  );
};
