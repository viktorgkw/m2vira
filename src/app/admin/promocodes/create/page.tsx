"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreatePromocode() {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (code.length > 6) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [code]);

  const create = async () => {
    try {
      const res = await fetch(
        `https://m2vira.vercel.app/api/promocodes/create`,
        {
          method: "POST",
          body: JSON.stringify({ code: code }),
        }
      );

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      router.push("/admin/promocodes");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center rounded-lg md:py-14 md:px-24 dark:bg-slate-800 dark:bg-opacity-70 my-4 px-1 py-6 bg-slate-200 bg-opacity-70">
        <h1 className="text-4xl md:text-5xl font-bold dark:text-slate-200 text-slate-800 drop-shadow-lg">
          Add new
        </h1>

        <hr className="w-48 h-1 mx-auto my-4 border-0 rounded mt-5 mb-12 bg-gradient-to-r dark:from-slate-300 dark:via-slate-200 dark:to-slate-300 drop-shadow-lg from-slate-800 via-slate-700 to-slate-800" />

        <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
          Code
        </label>

        <input
          className="p-2 rounded-lg mb-4 dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-96 w-fit outline-none text-slate-200 bg-slate-800"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code"
        />

        <button
          onClick={create}
          className="bg-gradient-to-r dark:from-slate-300 dark:via-slate-100 dark:to-slate-300 from-slate-800 via-slate-700 to-slate-800 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500 dark:text-slate-800 text-slate-200 font-bold py-2 px-4 rounded mt-6 mb-3 disabled:opacity-25"
          disabled={isDisabled}
        >
          Create
        </button>
      </div>
    </div>
  );
}
