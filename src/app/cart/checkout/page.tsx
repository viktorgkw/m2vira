"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loading } from "@/app/components/Loading";

export default function Cart() {
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
      await fetch("https://m2vira.vercel.app/api/cart/order", {
        method: "POST",
        body: JSON.stringify({ userEmail: session?.user?.email }),
      });

      setLoading(false);
    };

    fetchData();
  }, [router, session]);

  return (
    <>
      {!session?.user || loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/gifs/successtick.gif"
            height={256}
            width={256}
            alt="Success gif"
            unoptimized={true}
          />

          <div className="flex flex-col justify-center items-center bg-white bg-opacity-75 px-4 py-6 rounded-xl mx-2">
            <p className="uppercase text-2xl md:text-4xl text-emerald-400 font-bold text-center">
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
