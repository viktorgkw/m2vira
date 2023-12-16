"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { ProductDetailsColors } from "./ProductDetailsColors";
import { ProductDetailsSizes } from "./ProductDetailsSizes";
import { ProductDetailsMaterials } from "./ProductDetailsMaterials";
import { ProductDetailsButtons } from "./ProductDetailsButtons";
import { ProductDetailsType } from "@/types/ProductDetailsType";
import { ProductStateType } from "@/types/ProductStateType";

export const ProductDetailsOptions = ({
  product,
}: {
  product: ProductDetailsType;
}) => {
  const { data: session } = useSession();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [productState, setProductState] = useState<ProductStateType>({
    id: product._id,
    size: product.sizes[0],
    color: product.colors[0],
    image: product.images[0],
  });

  const onFavoriteAdd = async () => {
    setIsButtonDisabled(true);

    try {
      const res = await fetch(`${process.env.DOMAIN}/api/favorites/add`, {
        method: "POST",
        body: JSON.stringify({
          _id: product?._id,
          email: session?.user?.email,
        }),
      });

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      toast.success(data.message);
    } catch (err: any) {
      toast.error(err.message);
    }

    setIsButtonDisabled(false);
  };

  const onCartAdd = async () => {
    setIsButtonDisabled(true);

    try {
      const res = await fetch(`${process.env.DOMAIN}/api/cart/add`, {
        method: "POST",
        body: JSON.stringify({
          productState,
          email: session?.user?.email,
        }),
      });

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      toast.success(data.message);
    } catch (err: any) {
      toast.error(err.message);
    }

    setIsButtonDisabled(false);
  };

  return (
    <>
      <div className="flex flex-col my-6 pb-5">
        <ProductDetailsColors
          product={product}
          setProductState={setProductState}
          productState={productState}
        />

        <ProductDetailsSizes
          product={product}
          setProductState={setProductState}
          productState={productState}
        />

        <ProductDetailsMaterials product={product} />
      </div>

      <hr className="w-full h-1 border-0 rounded mb-8 bg-gradient-to-r dark:from-slate-300 dark:via-slate-200 dark:to-slate-300 from-slate-800 via-slate-700 to-slate-800 drop-shadow-lg" />

      <div className="flex items-center flex-col md:flex-row">
        <span className="text-2xl text-slate-800 dark:text-slate-200 font-bold">
          ${product?.price}
        </span>

        {session?.user && (
          <ProductDetailsButtons
            onCartAdd={onCartAdd}
            onFavoriteAdd={onFavoriteAdd}
            isButtonDisabled={isButtonDisabled}
          />
        )}
      </div>
    </>
  );
};
