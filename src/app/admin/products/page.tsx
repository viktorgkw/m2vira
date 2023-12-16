import Link from "next/link";
import { ProductsData } from "@/app/components/Admin/ProductsData";
import { NoData } from "@/app/components/Global/NoData";
import { FormTitle } from "@/app/components/Global/FormTitle";

export default async function AdminProducts() {
  const raw = await fetch(`${process.env.DOMAIN}/api/products/all`);

  const res = await raw.json();

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-4">
        <FormTitle text="Products" />

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
            <ProductsData products={res.products} />
          </div>
        </div>
      ) : (
        <NoData text="No products at the moment!" />
      )}
    </>
  );
}

export const dynamic = "force-dynamic";
