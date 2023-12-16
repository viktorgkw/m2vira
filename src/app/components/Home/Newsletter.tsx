"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export const Newsletter = () => {
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");

  const onSubscribe = async () => {
    try {
      setDisabled(true);

      const res = await fetch(
        "https://m2vira.vercel.app/api/newsletter/subscribe",
        {
          method: "POST",
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      toast.success(data.message);
    } catch (err: any) {
      toast.error(err.message);
    }

    setDisabled(false);
  };

  return (
    <div className="text-center bg-slate-200 bg-opacity-75 dark:bg-slate-800 dark:bg-opacity-75 px-2 py-8 mb-6 rounded-xl md:rounded-none mx-2 md:mx-0 dark:text-slate-200 text-slate-800">
      <h2 className="mb-4 text-3xl tracking-tight font-extrabold sm:text-4xl">
        Sign up for our newsletter
      </h2>

      <p className="mx-auto mb-8 max-w-2xl font-light sm:text-xl">
        Stay up to date with the roadmap progress, announcements and exclusive
        discounts feel free to sign up with your email.
      </p>

      <div className="items-center flex justify-center mb-3 dark:text-slate-200">
        <input
          className="p-2 border border-none rounded-lg focus:outline-none dark:text-slate-200 text-slate-800 drop-shadow-lg text-sm md:px-4 md:py-3"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@domain.com"
        />

        <button
          disabled={disabled}
          onClick={onSubscribe}
          className="flex px-2 py-2 mx-1 bg-sky-500 hover:bg-sky-400 text-white font-bold border-b-4 border-sky-800 hover:border-sky-600 rounded hover:scale-[1.05] duration-300 cursor-pointer"
        >
          <FontAwesomeIcon icon={faUserPlus} width={24} height={24} />
        </button>
      </div>
    </div>
  );
};
