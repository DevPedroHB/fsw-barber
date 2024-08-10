"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface ISessionProvider {
  children: ReactNode;
}

export function SessionProvider({ children }: ISessionProvider) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
