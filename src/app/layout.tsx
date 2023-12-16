import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Theme from "./ThemeProvider";
import { NextAuthProvider } from "./AuthProvider";
import { Toast } from "./components/Toast";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import "./globals.css";

const font = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "m2vira",
  description:
    "Elevate your wardrobe with our handpicked collection of trendy and timeless fashion pieces.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          font.className +
          " scrollbar-thin scrollbar-rounded-lg dark:scrollbar-track-slate-300 dark:scrollbar-thumb-slate-800 scrollbar-track-slate-800 scrollbar-thumb-slate-300"
        }
      >
        <NextAuthProvider>
          <Theme>
            <div className="items-center">
              <Toast />
            </div>

            <NavBar />

            <main className="min-h-screen py-3 bg-gradient-to-r dark:from-indigo-500 dark:via-sky-500 dark:to-emerald-500 from-indigo-400 via-purple-400 to-pink-400">
              {children}
              <SpeedInsights />
              <Analytics />
            </main>

            <Footer />
          </Theme>
        </NextAuthProvider>
      </body>
    </html>
  );
}
