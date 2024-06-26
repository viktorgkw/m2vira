"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FormButton } from "../Global/FormButton";
import { createPromocode } from "@/services/promocodesService";

export const CreatePromocodeForm = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState(1);

  useEffect(() => {
    if (code.length > 6) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [code, percent]);

  const create = async () => {
    const { status, message } = await createPromocode(code, percent);

    if (status !== 200) {
      toast.error(message);
      return;
    }

    toast.success(message);
    router.push("/admin/promocodes");
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

        <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
          Percent
        </label>

        <input
          className="p-2 rounded-lg mb-4 dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-96 w-fit outline-none text-slate-200 bg-slate-800"
          type="number"
          min={1}
          max={90}
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          placeholder="Percent"
        />

        <FormButton text="Create" action={create} isDisabled={isDisabled} />
      </div>
    </div>
  );
};
