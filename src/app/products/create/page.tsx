"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Loading } from "@/app/components/Loading";
import { CreateProductForm } from "@/app/components/Products/CreateProductForm";

export default function CreateProduct() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/products/all");
    },
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://m2vira.vercel.app/api/permissions`, {
        method: "POST",
        body: JSON.stringify({ email: session?.user?.email }),
      });

      const data = await res.json();

      if (data.status === 404) {
        return;
      }

      if (!data.isAdmin) {
        router.push("/products/all");
        return;
      }

      setLoading(false);
    };

    fetchData();
  }, [router, session]);

  return (
    <div className="flex items-center justify-center">
      {loading ? <Loading /> : <CreateProductForm />}
    </div>
  );
}
