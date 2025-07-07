"use client";

import { type LoginFormSchema, loginFormSchema } from "@/lib/types/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputWithLabel } from "../../reservationForm/InputWithLabel";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { login } from "@/app/_actions/auth/auth";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmitForm: SubmitHandler<LoginFormSchema> = async (data) => {
    await login(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="max-w-lg mx-auto flex flex-col"
    >
      <InputWithLabel
        register={register}
        name="email"
        label="Email"
        error={errors.email}
        type="email"
      />

      <div className="">
        <InputWithLabel
          register={register}
          name="password"
          label="Heslo"
          error={errors.password}
          type={showPassword ? "text" : "password"}
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="flex items-center mt-1 gap-1 cursor-pointer"
        >
          <EyeIcon strokeWidth={1.4} size={18} className="text-zinc-500" />
          <p className="text-sm text-zinc-500">Zobrazit heslo</p>
        </span>
      </div>

      <Button
        className={cn("mt-8 w-full max-w-3xs mx-auto")}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Probíhá přihlášení..." : "Přihlásit se"}
      </Button>
    </form>
  );
}
