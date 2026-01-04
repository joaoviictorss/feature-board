"use client";

import { AuthButton } from "@/components/auth-button";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps extends ComponentProps<"header"> {}

export const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header
      className={twMerge(
        "max-w-[900px] mx-auto w-full flex items-center justify-between",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <h1 className="font-semibold text-xl">Roteiro do produto</h1>

        <p className="text-sm text-navy-100">
          Acompanhe o progresso do desenvolvimento de toda a nossa plataforma.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <AuthButton />
      </div>
    </header>
  );
};
