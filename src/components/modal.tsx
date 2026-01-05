"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface ModalProps extends Dialog.DialogContentProps {
  children: React.ReactNode;
}

export function Modal({ className, ...props }: ModalProps) {
  const router = useRouter();

  const handleCloseModal = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog.Root defaultOpen onOpenChange={handleCloseModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />

        <Dialog.Content
          className={twMerge(
            "fixed right-0 top-0 z-60 h-full w-full max-w-[430px] bg-navy-950 overflow-y-auto border-l border-navy-700",
            className
          )}
          {...props}
        />
      </Dialog.Portal>
    </Dialog.Root>
  );
}
