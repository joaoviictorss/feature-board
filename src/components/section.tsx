import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface SectionContainerProps extends ComponentProps<"div"> {}

export const SectionContainer = ({
  className,
  ...props
}: SectionContainerProps) => {
  return (
    <div
      className={twMerge(
        "bg-navy-800 rounded-xl border-[0.5px] border-navy-500 pt-3 flex flex-col gap-1 relative",
        className
      )}
      {...props}
    />
  );
};

interface SectionHeaderProps extends ComponentProps<"div"> {}

export const SectionHeader = ({ className, ...props }: SectionHeaderProps) => {
  return (
    <div
      className={twMerge("flex items-center justify-between px-3", className)}
      {...props}
    />
  );
};

interface SectionTitleProps extends ComponentProps<"span"> {}

export const SectionTitle = ({ className, ...props }: SectionTitleProps) => {
  return (
    <span
      className={twMerge(
        "bg-navy-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs",
        className
      )}
      {...props}
    />
  );
};

interface SectionIssueCountProps extends ComponentProps<"span"> {}

export const SectionIssueCount = ({
  className,
  ...props
}: SectionIssueCountProps) => {
  return (
    <span className={twMerge("text-xs text-navy-200", className)} {...props} />
  );
};

interface SectionContentProps extends ComponentProps<"div"> {}

export const SectionContent = ({
  className,
  ...props
}: SectionContentProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-2.5 overflow-y-auto p-3 absolute inset-0 top-11 scrollbar scrollbar-h-[10px] scrollbar-thumb-navy-600 scrollbar-track-transparent",
        className
      )}
      {...props}
    />
  );
};

export const Section = {
  Container: SectionContainer,
  Header: SectionHeader,
  Title: SectionTitle,
  IssueCount: SectionIssueCount,
  Content: SectionContent,
};
