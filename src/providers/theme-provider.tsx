"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...rest }: ThemeProviderProps) {
  return <NextThemeProvider {...rest}>{children}</NextThemeProvider>;
}
