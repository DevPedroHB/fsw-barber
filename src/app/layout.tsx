import { cn } from "@/functions/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | FSW Barber",
    default: "FSW Barber",
  },
  description:
    "Agende seus serviços de barbearia com facilidade! O FSW Barber é uma plataforma que conecta você com as melhores barbearias da região. Encontre serviços de qualidade, preços competitivos e horários flexíveis. Faça sua reserva agora e experimente a melhor experiência de barbearia!",
};

interface IRootLayout {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<IRootLayout>) {
  return (
    <html lang="pt-br" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-screen scroll-smooth font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
