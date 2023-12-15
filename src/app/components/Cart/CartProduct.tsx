import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export const CartProduct = ({ product, removeFromCart }: any) => {
  return (
    <li key={product.id} className="flex flex-row md:flex-col">
      <div className="flex">
        <Link href={`/products/details/${product.id}`}>
          <Image
            src={product.images[0]}
            width={128}
            height={128}
            alt="Product"
          />
        </Link>

        <div className="flex flex-col justify-between w-full pb-4 text-slate-800">
          <div className="flex justify-between w-full pb-2 space-x-2">
            <div className="space-y-1 dark:text-slate-200 text-slate-800">
              <h3 className="md:text-lg text-sm font-semibold">
                {product.title}
              </h3>

              <p className="text-sm">Size: {product.size}</p>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-500">
                ${product.price}
              </p>
            </div>
          </div>

          <div className="flex text-sm divide-x">
            <button
              onClick={() => removeFromCart(product.id)}
              className="flex items-center px-2 py-1 bg-red-500 hover:bg-red-400 text-white font-bold border-b-4 border-red-800 hover:border-red-600 rounded hover:scale-[1.05] duration-300"
            >
              <FontAwesomeIcon icon={faTrashAlt} width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
