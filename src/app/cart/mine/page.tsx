"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Title } from "@/app/components/Global/Title";
import { NoProducts } from "@/app/components/Cart/NoProducts";
import { Loading } from "@/app/components/Cart/Loading";
import { PromocodeSection } from "@/app/components/Cart/PromocodeSection";
import { Subtotal } from "@/app/components/Cart/Subtotal";
import { GrandTotal } from "@/app/components/Cart/GrandTotal";
import { ButtonsSection } from "@/app/components/Cart/ButtonsSection";
import { CartProduct } from "@/app/components/Cart/CartProduct";
import { CartProductType } from "@/types/CartProductType";
import { PromocodeType } from "@/types/PromocodeType";

export default function Cart() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/products/all");
    },
  });

  const [products, setProducts] = useState<CartProductType[]>([]);
  const [promocode, setPromocode] = useState<PromocodeType>({
    id: null,
    code: "",
    percent: 0,
    isValid: false,
  });
  const [promocodeDisabled, setPromocodeDisabled] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkoutDisabled, setCheckoutDisabled] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setCheckoutDisabled(false);
    } else {
      setCheckoutDisabled(true);
    }
  }, [products]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const res = await fetch(`${process.env.DOMAIN}/api/cart/get`, {
        method: "POST",
        body: JSON.stringify({ email: session?.user?.email }),
      });

      const data = await res.json();

      if (data.status !== 200) {
        toast.error(data.message);
        router.push("/");
      }

      setProducts(data.cart);

      setSubtotal(
        data.cart.reduce((total: any, { price }: any) => total + price, 0)
      );

      setLoading(false);
    };

    fetchData();
  }, [router, session, subtotal]);

  const removeFromCart = async (prodId: any) => {
    const res = await fetch(`${process.env.DOMAIN}/api/cart/delete`, {
      method: "POST",
      body: JSON.stringify({ id: prodId, email: session?.user?.email }),
    });

    const data = await res.json();

    if (data.status !== 200) {
      toast.error(data.message);
      router.push("/");
      return;
    }

    toast.success(data.message);
    setProducts(products.filter((p) => p.id !== prodId));
  };

  const applyPromocode = async () => {
    setPromocodeDisabled(true);

    try {
      const res = await fetch(`${process.env.DOMAIN}/api/promocodes/validate`, {
        method: "POST",
        body: JSON.stringify({ promocode: promocode.code }),
      });

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      setPromocode({
        ...promocode,
        id: data.code._id,
        percent: data.code.percent,
        isValid: true,
      });

      toast.success("Promocode applied!");
    } catch (err: any) {
      toast.error(err.message);
      setPromocode({ ...promocode, code: "" });
      setPromocodeDisabled(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-8 mx-2">
        <Title text="Your Cart" />

        <div className="flex flex-col max-w-3xl space-y-4 bg-opacity-50 dark:bg-opacity-50 bg-slate-200 dark:bg-slate-800 rounded-xl px-8 py-12">
          {!session?.user || loading ? (
            <Loading />
          ) : products.length === 0 ? (
            <NoProducts />
          ) : (
            <ul className="flex flex-col">
              {products.map((p) => (
                <CartProduct
                  key={p.id}
                  product={p}
                  removeFromCart={removeFromCart}
                />
              ))}
            </ul>
          )}

          <div className="space-y-1 text-center pt-4">
            {products.length > 0 && (
              <>
                <PromocodeSection
                  promocode={promocode}
                  promocodeDisabled={promocodeDisabled}
                  setPromocode={setPromocode}
                  applyPromocode={applyPromocode}
                />

                <Subtotal subtotal={subtotal.toFixed(2)} />
              </>
            )}

            <GrandTotal promocode={promocode} subtotal={subtotal} />

            <p className="text-sm font-bold text-red-500">
              Not including taxes and shipping costs
            </p>
          </div>

          <ButtonsSection
            checkoutDisabled={checkoutDisabled}
            router={router}
            products={products}
            promocode={promocode}
          />
        </div>
      </div>
    </>
  );
}
