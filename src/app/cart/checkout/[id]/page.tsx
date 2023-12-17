"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loading } from "@/app/components/Loading";
import { Content } from "@/app/components/Cart/Checkout/Content";
import { deleteById } from "@/services/promocodesService";
import { orderCart } from "@/services/cartService";

export default function CheckoutPage({ params }: any) {
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
      await orderCart(session?.user?.email);

      if (params.id !== null) {
        await deleteById(params.id);
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
