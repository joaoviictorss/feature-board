"use client";

import { Input } from "@/components/input";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon, LogInIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { debounce, parseAsString, useQueryState } from "nuqs";
import { ChangeEvent, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps extends ComponentProps<"header"> {}

export const Header = ({ className, ...props }: HeaderProps) => {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  const handleSearchUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value, {
      limitUrlUpdates: event.target.value !== "" ? debounce(500) : undefined,
    });
  };

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
        <div className="relative">
          <SearchIcon className="size-4 text-navy-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Pesquisar por funcionalidades..."
            className="w-67 pl-10"
            value={search}
            onChange={handleSearchUpdate}
          />
        </div>
        <AuthButton />
      </div>
    </header>
  );
};

export const AuthButton = () => {
  const { signIn, signOut, useSession } = authClient;

  const { data: session, isPending } = useSession();

  const handleSignIn = async () => {
    signIn.social({
      provider: "github",
      callbackURL: `/`,
    });
  };

  const handleSignOut = async () => {
    signOut();
  };

  if (isPending) {
    return (
      <div className="size-8 rounded-full bg-navy-700 border-[0.5px] border-navy-500 flex items-center justify-center">
        <Loader2Icon className="size-3.5 text-navy-200 animate-spin" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <button
        type="button"
        className="size-8 rounded-full bg-navy-700 border-[0.5px] border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
        onClick={handleSignOut}
      >
        <Image
          src={session.user.image ?? ""}
          alt={session.user.name}
          width={32}
          height={32}
          className="object-cover"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="size-8 rounded-full bg-navy-700 border-[0.5px] border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
      onClick={handleSignIn}
    >
      <LogInIcon className="size-3.5 text-navy-200" />
    </button>
  );
};
