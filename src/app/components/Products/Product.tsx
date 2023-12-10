import Link from "next/link";
import Image from "next/image";

export const Product = ({ product }: any) => {
  return (
    <div
      key={product._id}
      className="rounded-xl max-w-xs sm:max-w-xs overflow-hidden shadow-xl md:hover:scale-[1.03] bg-gradient-to-r from-slate-300 via-white to-slate-300 md:bg-[position:_0%_0%] md:hover:bg-[position:_100%_100%]  md:bg-[size:_200%] md:transition-all md:duration-500 mx-2 my-4 md:mx-6"
    >
      <Link href={`/products/details/${product._id}`}>
        <div className="relative">
          <Image
            src={product.image}
            alt="Dress"
            width={512}
            height={512}
            layout="responsive"
            priority
          />
          <hr className="w-48 h-1 mx-auto my-4 border-0 rounded bg-slate-950 drop-shadow-lg absolute bottom-0 left-1/2 transform -translate-x-1/2" />
        </div>
      </Link>
      <div className="py-2 px-4 sm:py-4 sm:px-6 flex flex-col items-center cursor-default">
        <h3 className="md:text-lg text-sm font-semibold text-slate-950 w-full truncate text-center">
          {product.title}
        </h3>
        <p className="mt-2 sm:mt-4 text-lg sm:text-xl font-bold text-slate-950">
          ${product.price}
        </p>
      </div>
    </div>
  );
};
