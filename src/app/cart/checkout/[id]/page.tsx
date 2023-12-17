"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "@/app/components/Loading";
import { Content } from "@/app/components/Cart/Checkout/Content";
import { deleteById } from "@/services/promocodesService";
import { orderCart } from "@/services/cartService";

export default function CheckoutPage({ params }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await orderCart();

      if (params.id !== null) {
        await deleteById(params.id);
      }

      setLoading(false);
    };

    fetchData();
  }, [router, params]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <Content />
        </div>
      )}
    </>
  );
}
