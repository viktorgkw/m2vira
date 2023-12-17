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
import { addFavorite } from "@/services/favoritesService";
import { addToCart } from "@/services/cartService";

export const ProductDetailsOptions = ({
  product,
}: {
  product: ProductDetailsType;
}) => {
  const { status } = useSession();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [productState, setProductState] = useState<ProductStateType>({
    id: product._id,
    size: product.sizes[0],
    color: product.colors[0],
    image: product.images[0],
  });

  const onFavoriteAdd = async () => {
    setIsButtonDisabled(true);

    const { status, message } = await addFavorite(productState.id);

    if (status !== 200) {
      toast.error(message);
    } else {
      toast.success(message);
    }

    setIsButtonDisabled(false);
  };

  const onCartAdd = async () => {
    setIsButtonDisabled(true);

    const { status, message } = await addToCart(productState);

    if (status !== 200) {
      toast.error(message);
    } else {
      toast.success(message);
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

        {status === "authenticated" && (
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
