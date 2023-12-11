"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export const FavoriteProduct = ({ product, disabled, removeFavorite }: any) => {
  return (
    <div className="rounded-xl max-w-xs overflow-hidden shadow-xl md:hover:scale-[1.03] bg-slate-200 dark:bg-slate-800 bg-opacity-40 dark:bg-opacity-40 md:transition-all md:duration-500 mx-2 my-4 md:mx-6 dark:text-slate-200 text-slate-800">
      <Link href={`/products/details/${product._id}`}>
        <Image
          src={product.image}
          alt="Dress"
          width={512}
          height={512}
          priority
        />

        <hr className="w-48 h-1 mx-auto my-4 border-0 rounded dark:bg-slate-300 bg-slate-800 drop-shadow-lg" />
      </Link>
      <div className="py-4 px-4 flex flex-col items-center cursor-default">
        <h3 className="md:text-lg text-sm font-semibold w-full truncate text-center">
          {product.title}
        </h3>

        <p className="mt-2 sm:mt-4 text-lg sm:text-xl font-bold">
          ${product.price}
        </p>

        <button
          disabled={disabled}
          onClick={() => removeFavorite(product._id)}
          className="text-red-700 hover:text-red-600 focus:outline-none font-medium rounded-lg text-sm text-center inline-flex items-center mt-2 mx-2"
        >
          <FontAwesomeIcon icon={faHeartCrack} width="28" height="28" />
        </button>
      </div>
    </div>
  );
};
