"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./antd/Button";
import { Modal } from "./antd/Modal";
import { AuthForm } from "@/features/auth/AuthForm";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES, RoutesTitle } from "../constants/routes";

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

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
    await fetch("api/auth/logout", { method: "POST" });
    router.push(ROUTES.ROOT);
  };

  return (
    <header className="flex justify-between items-center py-2 px-4 bg-black shadow-sm shadow-white">
      <Link href={ROUTES.ROOT}>
        <div className="text-white">Logo</div>
      </Link>
      <div className="text-white">{RoutesTitle[pathname]}</div>
      {pathname === ROUTES.ROOT ? (
        <div className="flex gap-3 max-w-[10%]">
          <Button text="Sign In" onClick={onSignInOpen} />
          <Button text="Sign Up" onClick={onSignUpOpen} />
        </div>
      ) : (
        <Button
          text="Выйти"
          onClick={onLogout}
          containerClassName="max-w-[5%]"
        />
      )}
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
