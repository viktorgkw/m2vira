import Link from "next/link";
import Image from "next/image";

export const Product = ({ product }: any) => {
  return (
    <div
      key={product._id}
      className="rounded-xl max-w-xs overflow-hidden shadow-xl md:hover:scale-[1.03] bg-slate-200 dark:bg-slate-800 bg-opacity-40 dark:bg-opacity-40 md:transition-all md:duration-500 mx-2 my-4 md:mx-6 dark:text-slate-200 text-slate-800"
    >
      <Link href={`/products/details/${product._id}`}>
        <div className="relative">
          <Image
            src={product.image}
            alt="Dress"
            width={512}
            height={512}
            priority
          />

          <hr className="w-48 h-1 mx-auto border-0 rounded drop-shadow-lg absolute bottom-0 left-1/2 transform -translate-x-1/2 dark:bg-slate-300 bg-slate-800" />
        </div>
      </Link>
      <div className="py-2 px-4 sm:py-4 sm:px-6 flex flex-col items-center cursor-default">
        <h3 className="md:text-lg text-sm font-semibold w-full truncate text-center">
          {product.title}
        </h3>

        <p className="mt-2 sm:mt-4 text-lg sm:text-xl font-bold">
          ${product.price}
        </p>
      </div>
    </div>
  );
};
