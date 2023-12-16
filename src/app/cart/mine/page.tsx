"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { checkout } from "@/helpers/stripe";
import { CartProduct } from "../../components/Cart/CartProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";

type Product = {
  id: string;
  title: string;
  price: number;
  color: string;
  size: string;
  image: string;
};

type Promocode = {
  id: any;
  code: string;
  percent: number;
  isValid: boolean;
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
  const [promocode, setPromocode] = useState<Promocode>({
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
        <p className="text-3xl md:text-5xl uppercase text-slate-200 font-bold">
          Your Cart
        </p>

        <hr className="h-1 w-48 md:w-72 mx-auto border-0 rounded md:mt-5 md:mb-6 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 drop-shadow-lg mb-8" />

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

          <div className="space-y-1 text-center pt-4">
            {products.length > 0 && (
              <>
                <div className="flex flex-row justify-center items-center mb-4">
                  <input
                    className="p-2 rounded-lg dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-48 w-[75%] outline-none text-slate-200 bg-slate-800 mx-1 disabled:opacity-25"
                    type="text"
                    value={promocode.code}
                    disabled={promocodeDisabled}
                    onChange={(e) =>
                      setPromocode({ ...promocode, code: e.target.value })
                    }
                    placeholder="Enter Promocode"
                  />

                  <button
                    onClick={applyPromocode}
                    disabled={promocodeDisabled}
                    className="flex px-2 py-2 mx-1 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold border-b-4 border-fuchsia-800 hover:border-fuchsia-600 rounded hover:scale-[1.05] duration-300 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:border-indigo-800 dark:hover:border-indigo-600 disabled:opacity-25"
                  >
                    <FontAwesomeIcon icon={faTicket} width={20} height={20} />
                  </button>
                </div>

                <p>
                  Subtotal:
                  <span className="font-semibold text-sky-600 dark:text-sky-500">
                    {" "}
                    ${subtotal.toFixed(2)}
                  </span>
                </p>
              </>
            )}

            {promocode.isValid && (
              <>
                <p>
                  Discount:
                  <span className="font-semibold text-amber-600 dark:text-amber-500">
                    {" "}
                    {promocode.percent}%
                  </span>
                </p>

                <p>
                  Grand Total:
                  <span className="font-semibold text-emerald-600 dark:text-emerald-500">
                    {" "}
                    $
                    {(subtotal - (subtotal * promocode.percent) / 100).toFixed(
                      2
                    )}
                  </span>
                </p>
              </>
            )}

            <p className="text-sm font-bold text-red-500">
              Not including taxes and shipping costs
            </p>
          </div>

          <div className="flex justify-between pt-6">
            <Link
              href="/products/all"
              className="px-2 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold border-b-4 border-blue-800 hover:border-blue-600 rounded hover:scale-[1.05] duration-300 mx-1"
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
                  router.push(await checkout({ products, promocode }))
                }
                className="px-2 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold border-b-4 border-emerald-800 hover:border-emerald-600 rounded hover:scale-[1.05] duration-300 disabled:opacity-50 h-full mx-1"
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
