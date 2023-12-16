import Link from "next/link";
import { ProductsData } from "@/app/components/Admin/ProductsData";

export default async function AdminProducts() {
  const raw = await fetch(`${process.env.DOMAIN}/api/products/all`);

  const res = await raw.json();

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-4">
        <h1 className="text-center text-3xl md:text-5xl">Manage products</h1>

        <hr className="h-1 md:w-96 w-64 mx-auto my-4 border-0 rounded md:mt-5 md:mb-6 bg-gradient-to-r dark:from-slate-300 dark:via-slate-200 dark:to-slate-300 from-slate-800 via-slate-700 to-slate-800 drop-shadow-lg" />

        <Link
          href="/products/create"
          className="px-3 py-2 text-sm md:text-lg text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:outline-none font-medium mb-6"
        >
          Create new
        </Link>
      </div>

      {res.products.length > 0 ? (
        <div className="px-4 sm:px-8 py-4 overflow-x-auto md:flex md:justify-center">
          <div className="inline-block max-w-fit shadow rounded-lg overflow-hidden">
            <table className="leading-normal w-auto">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Functions
                  </th>
                </tr>
              </thead>

              <ProductsData products={res.products} />
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-8 mx-2">
          <div className="flex flex-col items-center justify-center bg-white bg-opacity-50 rounded-xl px-6 py-8">
            <p className="text-red-700 text-2xl md:text-3xl font-bold text-center uppercase">
              No products at the moment!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export const dynamic = "force-dynamic";
