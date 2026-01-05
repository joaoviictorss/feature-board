import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends ComponentProps<"input"> {}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={twMerge(
        "bg-navy-900 border-[0.5px] border-navy-500 h-10 flex items-center placeholder:text-navy-200 rounded-lg px-3 text-sm",
        "outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
};
