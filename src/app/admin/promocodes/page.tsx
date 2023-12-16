"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Loading } from "@/app/components/Loading";
import { CodesData } from "@/app/components/Admin/CodesData";
import { FormTitle } from "@/app/components/Global/FormTitle";
import { NoData } from "@/app/components/Global/NoData";

export default function AdminPromocodesPage() {
  const router = useRouter();

  const [codes, setCodes] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.DOMAIN}/api/promocodes/all`);

      const data = await res.json();

      if (data.status !== 200) {
        toast.error(data.message);
        router.push("/");
      }

      setCodes(data.codes);
    };

    fetchData();
  }, [router]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-4">
        <FormTitle text="Promocodes" />

        <Link
          href="/admin/promocodes/create"
          className="px-3 py-2 text-sm md:text-lg text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:outline-none font-medium mb-6"
        >
          Create new
        </Link>
      </div>

      {!codes ? (
        <Loading />
      ) : codes.length > 0 ? (
        <div className="px-4 sm:px-8 py-4 overflow-x-auto md:flex md:justify-center">
          <div className="inline-block max-w-fit shadow rounded-lg overflow-hidden">
            <CodesData codesData={codes} />
          </div>
        </div>
      ) : (
        <NoData text="No promocodes at the moment!" />
      )}
    </>
  );
}

export const dynamic = "force-dynamic";
