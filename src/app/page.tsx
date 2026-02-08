"use client";

import { AuthForm } from "@/features/auth/AuthForm";
import Image from "next/image";
import { Modal } from "antd";
import { useState } from "react";
import { Button } from "@/shared/components/Button";

export default function Home() {
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
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Portfolio App
          </h1>
          <Button text="Sign in" onClick={onSignInOpen} />
          <Button text="Sign up" onClick={onSignUpOpen} />
        </div>
        <Modal
          title={isSignIn ? "Вход" : "Регистрация"}
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          className="bg-pink"
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
      </main>
    </div>
  );
}
