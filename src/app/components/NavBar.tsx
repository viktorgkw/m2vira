"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signIn, useSession } from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faHeart,
  faBagShopping,
  faShirt,
  faUserPlus,
  faSun,
  faMoon,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { isAdministrator } from "@/services/authService";

config.autoAddCss = false;

export const NavBar = () => {
  const { status, data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsAdmin(await isAdministrator());
    };

    fetchData();
  }, [session]);

  return (
    <nav className="py-4 px-4 bg-gradient-to-r dark:from-slate-950 dark:via-slate-800 dark:to-slate-950 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500 from-indigo-200 via-purple-200 to-pink-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="left-links">
          <ul className="flex flex-row text-slate-800 dark:text-slate-200">
            <li className="mx-3 hover:text-cyan-500">
              <Link
                href="/"
                className="flex flex-col justify-center items-center"
              >
                <FontAwesomeIcon icon={faHouse} width="24" height="24" />
                <p className="font-semibold">Home</p>
              </Link>
            </li>

            <li className="mx-3 hover:text-violet-500">
              <Link
                href="/products/all"
                className="flex flex-col justify-center items-center"
              >
                <FontAwesomeIcon icon={faShirt} width="24" height="24" />
                <p className="font-semibold">Fashion</p>
              </Link>
            </li>

            {isAdmin && (
              <li className="mx-3 hover:text-fuchsia-500">
                <Link
                  href="/admin/home"
                  className="flex flex-col justify-center items-center"
                >
                  <FontAwesomeIcon icon={faLock} width="24" height="24" />
                  <p className="font-semibold">Dashboard</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="right-links mt-4 md:mt-0">
          <ul className="flex flex-row flex-wrap items-center justify-center text-slate-800 dark:text-slate-200">
            {status !== "loading" && (
              <>
                {status === "authenticated" ? (
                  <>
                    <li className="mx-3 hover:text-sky-500">
                      <Link
                        href="/cart/mine"
                        className="flex flex-col justify-center items-center"
                      >
                        <FontAwesomeIcon
                          icon={faBagShopping}
                          width="24"
                          height="24"
                        />
                        <p className="font-semibold">Cart</p>
                      </Link>
                    </li>

                    <li className="mx-3 hover:text-red-500">
                      <Link
                        href="/favorites"
                        className="flex flex-col justify-center items-center"
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          width="24"
                          height="24"
                        />
                        <p className="font-semibold">Favorites</p>
                      </Link>
                    </li>

                    <li className="mx-3 hover:text-emerald-500">
                      <Link
                        href="/profile"
                        className="flex flex-col justify-center items-center"
                      >
                        <FontAwesomeIcon icon={faUser} width="24" height="24" />
                        <p className="font-semibold">Profile</p>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="mx-3 hover:text-emerald-500">
                    <button
                      onClick={() =>
                        signIn("google", { callbackUrl: "/profile" })
                      }
                      className="flex flex-col justify-center items-center"
                    >
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        width="28"
                        height="28"
                      />
                      <p className="font-semibold">Sign In</p>
                    </button>
                  </li>
                )}
                <li className="mx-3 hover:text-emerald-500">
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="flex flex-col justify-center items-center hover:text-pink-300"
                  >
                    {theme === "dark" ? (
                      <>
                        <FontAwesomeIcon icon={faSun} width="28" height="28" />
                        <p className="font-semibold">Light</p>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faMoon} width="28" height="28" />
                        <p className="font-semibold">Dark</p>
                      </>
                    )}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
