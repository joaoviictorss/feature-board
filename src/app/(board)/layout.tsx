import { Suspense } from "react";
import { Header } from "./_components/header";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1620px] mx-auto p-10 w-full flex flex-col gap-8 h-dvh">
      <Suspense>
        <Header />
      </Suspense>

      {children}
    </div>
  );
}
