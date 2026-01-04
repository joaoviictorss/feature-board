import "./globals.css";

import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next";
import { ReactQueryProvider } from "@/lib/query-client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Roteiro do produto",
    default: "Roteiro do produto",
  },
  description:
    "Acompanhe o progresso do desenvolvimento de toda a nossa plataforma.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`bg-navy-950 text-navy-50 antialiased ${inter.variable}`}
      >
        <ReactQueryProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
