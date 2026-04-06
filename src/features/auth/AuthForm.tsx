"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { authFormSchema, AuthFormValues } from "./authSchema";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { useAuth } from "@/shared/hooks/useAuth";
import { Button } from "@/shared/components/Button";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { FormInput } from "@/shared/components/FormInput";
import { useState } from "react";

interface AuthFormProps {
  submitText: string;
  apiUrl: string;
  successText: string;
  onClose: () => void;
  isLogin?: boolean;
}

export function AuthForm({
  submitText,
  apiUrl,
  successText,
  onClose,
  isLogin = false,
}: AuthFormProps) {
  const { refresh } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<AuthFormValues> = async ({
    email,
    password,
  }) => {
    setIsLoading(true);
    const result = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (result.ok) {
      toast.success(successText, { id: "auth-success" });
      await refresh();
      if (isLogin) router.push(ROUTES.TODOS);
      onClose();
    } else {
      toast.error(isLogin ? "Неверный логин или пароль" : "Ошибка регистрации");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-75 my-10 mx-auto">
      <FormInput
        name="email"
        placeholder="Email"
        register={register}
        errorMessage={errors.email?.message}
        containerClassname="mb-6"
      />
      <FormInput
        name="password"
        type="password"
        placeholder="Password"
        register={register}
        errorMessage={errors.password?.message}
        containerClassname="mb-6"
      />

      <Button
        text={submitText}
        type="submit"
        size="small"
        className="w-full"
        isLoading={isLoading}
      />

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="px-3 text-gray-400 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <GoogleAuthButton />
    </form>
  );
}
