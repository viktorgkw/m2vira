import Image from "next/image";
import { ProductDetailsOptions } from "./ProductDetailsOptions";

export const ProductDetailsInfo = ({ product }: any) => {
  return (
    <div className="lg:w-4/5 mx-auto flex flex-wrap dark:bg-slate-800 dark:bg-opacity-40 bg-slate-200 bg-opacity-40 rounded-xl p-5">
      <Image
        priority
        width={2048}
        height={2048}
        alt="Product Image"
        className="lg:w-1/2 w-full object-cover object-center rounded hover:scale-[1.03] duration-300"
        src={product.images[0]}
      />

      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm text-slate-800 dark:text-slate-200 tracking-widest break-words">
          {product?.tags.join("/")}
        </h2>

        <h1 className="text-slate-800 dark:text-slate-200 text-3xl my-4 font-bold">
          {product?.title}
        </h1>

        <p className="leading-relaxed text-slate-800 dark:text-slate-200">
          {product?.description}
        </p>

        <ProductDetailsOptions product={product} />
      </div>
    </div>
  );
};
