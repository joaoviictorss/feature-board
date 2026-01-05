"use client";

import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      type="button"
      className="flex items-center gap-2 text-navy-200 hover:text-navy-100 cursor-pointer"
    >
      <MoveLeftIcon className="size-4" />
      <span className="text-xs">Voltar</span>
    </button>
  );
};
