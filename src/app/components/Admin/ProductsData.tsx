"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export const ProductsData = ({ products }: any) => {
  const [prods, setProds] = useState(products);

  const deleteProduct = async (id: any) => {
    const raw = await fetch("https://m2vira.vercel.app/api/products/delete", {
      method: "POST",
      body: JSON.stringify({ _id: id }),
    });

    const res = await raw.json();

    if (res.status === 200) {
      setProds(prods!.filter((p: any) => p._id !== id));
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <tbody>
      {prods.map((p: any) => (
        <tr key={p.title}>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex items-center">
              <p className="whitespace-no-wrap text-violet-600">{p.title}</p>
            </div>
          </td>

          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="whitespace-no-wrap text-emerald-600">{p.price}</p>
          </td>

          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <Link
              href={`/products/details/${p._id}`}
              className="px-3 py-2 text-sm text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:outline-none font-medium mx-1 my-2 md:my-0"
            >
              Details
            </Link>

            <Link
              href={`/products/edit/${p._id}`}
              className="px-3 py-2 text-sm text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:outline-none font-medium mx-1 my-2 md:my-0"
            >
              Edit
            </Link>

            <button
              onClick={() => deleteProduct(p._id)}
              className="px-3 py-2 text-sm text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none font-medium mx-1 my-2 md:my-0"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
