"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="bg-gradient-to-r dark:from-slate-950 dark:via-slate-800 dark:to-slate-950 shadow-lg bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500 from-indigo-200 via-purple-200 to-pink-200">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href={process.env.DOMAIN} className="flex items-center">
              <Image
                src={theme === "dark" ? "/logo-white.png" : "/logo-black.png"}
                width={128}
                height={128}
                priority
                className="cursor-default bg-transparent"
                alt="Website logo"
              />

              <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-800 dark:text-slate-200 cursor-default">
                m2vira
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-indigo-500 cursor-default">
                m2vira
              </h2>

              <ul className="font-medium">
                <li className="mb-4 text-slate-800 dark:text-slate-200 hover:text-white">
                  <Link href="/aboutus">About Us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-emerald-400 cursor-default">
                Legal
              </h2>

              <ul className="font-medium">
                <li className="mb-4 text-slate-800 dark:text-slate-200 hover:text-white">
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-slate-800 dark:border-slate-200 sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center text-slate-800 dark:text-slate-200 cursor-default font-bold">
            © {new Date().getFullYear()}
            <a href={process.env.DOMAIN} className="hover:text-white">
              {" "}
              m2vira™
            </a>
            {"  "}
            All Rights Reserved.
          </span>

          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <p className="text-sm font-semibold">m2virafashion@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
