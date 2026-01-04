"use client";

import { AuthButton } from "@/components/auth-button";
import { Input } from "@/components/input";
import { SearchIcon } from "lucide-react";
import { debounce, parseAsString, useQueryState } from "nuqs";
import { ChangeEvent, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps extends ComponentProps<"header"> {}

export const Header = ({ className, ...props }: HeaderProps) => {
  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      shallow: false,
    })
  );

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
