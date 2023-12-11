"use client";

import { ThemeProvider } from "next-themes";

export default function Theme({ children }: any) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
