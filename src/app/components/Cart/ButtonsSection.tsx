import Link from "next/link";
import { checkout } from "@/helpers/stripe";

export const ButtonsSection = ({
  checkoutDisabled,
  router,
  products,
  promocode,
}: any) => {
  return (
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
  );
};
