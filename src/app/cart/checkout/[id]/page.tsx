"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Loading } from "@/app/components/Loading";

export default function Cart({ params }: any) {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.DOMAIN}/api/cart/order`, {
        method: "POST",
        body: JSON.stringify({ userEmail: session?.user?.email }),
      });

      await fetch(`${process.env.DOMAIN}/api/promocodes/delete`, {
        method: "POST",
        body: JSON.stringify({ _id: params.id }),
      });

      setLoading(false);
    };

    fetchData();
  }, [router, session, params]);

  return (
    <>
      {!session?.user || loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center dark:bg-slate-800 dark:bg-opacity-75 px-6 py-6 rounded-xl mx-2 bg-slate-200 bg-opacity-75">
            <Image
              src="/gifs/successtick.gif"
              height={256}
              width={256}
              alt="Success gif"
              unoptimized={true}
            />

            <p className="uppercase text-2xl md:text-4xl text-emerald-400 font-bold text-center mb-8">
              Checkout was successful!
            </p>

            <div className="flex flex-row justify-center items-center">
              <Link
                href="/"
                className="flex px-2 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold border-b-4 border-emerald-800 hover:border-emerald-600 rounded hover:scale-[1.05] duration-300 mt-6 mx-2"
              >
                Go to Home
              </Link>

              <Link
                href="/profile"
                className="flex px-2 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold border-b-4 border-sky-800 hover:border-sky-600 rounded hover:scale-[1.05] duration-300 mt-6 mx-2"
              >
                Go to Profile
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
