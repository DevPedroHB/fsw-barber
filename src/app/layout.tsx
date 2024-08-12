import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/functions/utils";
import { SessionProvider } from "@/providers/session-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
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
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen scroll-smooth font-sans antialiased",
          nunito.variable,
        )}
      >
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Toaster richColors pauseWhenPageIsHidden />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
