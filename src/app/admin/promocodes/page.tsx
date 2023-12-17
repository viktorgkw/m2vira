"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { Loading } from "@/app/components/Loading";
import { CodesData } from "@/app/components/Admin/CodesData";
import { FormTitle } from "@/app/components/Global/FormTitle";
import { NoData } from "@/app/components/Global/NoData";
import { getAll } from "@/services/promocodesService";
import { useEffect, useState } from "react";

export default function AdminPromocodesPage() {
  const [codes, setCodes] = useState<any[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { status, codes } = await getAll();

      if (status !== 200) redirect("/");

      setCodes(codes);
    };

    fetchData();
  }, []);

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
