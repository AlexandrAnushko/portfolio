"use client";

import { useState } from "react";
import { Button } from "./antd/Button";
import { Modal } from "./antd/Modal";
import { AuthForm } from "@/features/auth/AuthForm";

export const Header = () => {
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
    <header className="flex justify-end py-2 px-4 bg-black">
      <div className="flex gap-3">
        <Button text="Sign In" onClick={onSignInOpen} />
        <Button text="Sign Up" onClick={onSignUpOpen} />
      </div>
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
