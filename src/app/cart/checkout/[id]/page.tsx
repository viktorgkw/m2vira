"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loading } from "@/app/components/Loading";
import { Content } from "@/app/components/Cart/Content";

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

      if (params.id !== null) {
        await fetch(`${process.env.DOMAIN}/api/promocodes/delete`, {
          method: "POST",
          body: JSON.stringify({ _id: params.id }),
        });
      }

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
          <Content />
        </div>
      )}
    </>
  );
}
