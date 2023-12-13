"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getImage } from "@/helpers/firebaseStorage";
import { checkout } from "@/helpers/checkout";
import { CartProduct } from "../../components/Cart/CartProduct";

type Product = {
  id: string;
  title: string;
  price: number;
  color: string;
  size: string;
  image: string;
};

export default function Cart() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/products/all");
    },
  });

  const [products, setProducts] = useState<Product[]>([]);
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
      const res = await fetch("https://m2vira.vercel.app/api/cart/get", {
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

      await Promise.all(
        data.cart.map(async (product: Product) => {
          product.image = await getImage(product.title);
        })
      );

      setLoading(false);
    };

    fetchData();
  }, [router, session?.user?.email]);

  const removeFromCart = async (prodId: any) => {
    const res = await fetch(`https://m2vira.vercel.app/api/cart/delete`, {
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

  return (
    <>
      <div className="flex flex-col items-center justify-center my-8">
        <p className="text-2xl md:text-5xl uppercase text-slate-200 font-bold">
          Your Cart
        </p>

        <hr className="h-1 w-36 md:w-72 mx-auto mb-4 border-0 rounded md:mt-5 md:mb-6 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 drop-shadow-lg" />

        <div className="flex flex-col max-w-3xl space-y-4 bg-opacity-50 dark:bg-opacity-50 bg-slate-200 dark:bg-slate-800 rounded-xl px-8 py-12">
          {!session?.user || loading ? (
            <div className="my-2">
              <p className="font-bold text-slate-200 text-lg">Loading...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="my-2">
              <p className="font-bold text-red-500 text-lg">
                No products in your cart!
              </p>
            </div>
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

          <div className="space-y-1 text-right">
            <p>
              Total amount:
              <span className="font-semibold text-emerald-600 dark:text-emerald-500">
                {" "}
                ${subtotal.toFixed(2)}
              </span>
            </p>
            <p className="text-sm font-bold text-red-500">
              Not including taxes and shipping costs
            </p>
          </div>
          <div className="flex justify-between">
            <Link
              href="/products/all"
              className="px-2 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold border-b-4 border-blue-800 hover:border-blue-600 rounded hover:scale-[1.05] duration-300"
            >
              Continue Shopping
            </Link>

            <div className="has-tooltip">
              <span className="tooltip rounded-xl shadow-lg bg-opacity-75 bg-white mt-12 px-2 py-1">
                Test Card: 4242-4242-4242-4242
              </span>
              <button
                disabled={checkoutDisabled}
                onClick={async () =>
                  router.push(await checkout({ cartTotal: subtotal }))
                }
                className="px-2 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold border-b-4 border-emerald-800 hover:border-emerald-600 rounded hover:scale-[1.05] duration-300 disabled:opacity-50"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
