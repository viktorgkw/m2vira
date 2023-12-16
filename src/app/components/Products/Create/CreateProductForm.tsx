"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FormButton } from "../../Global/FormButton";
import { CreateProductInputFields } from "./CreateProductInputFields";
import { FormTitle } from "../../Global/FormTitle";
import { CreateProductType } from "@/types/CreateProductType";
import { create } from "@/services/productsService";

export const CreateProductForm = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);
  const [product, setProduct] = useState<CreateProductType>({
    title: "",
    description: "",
    price: 0.1,
    images: null,
    materials: "",
    sizes: "",
    colors: "",
    tags: "",
  });

  const [textareaRows, setTextareaRows] = useState(6);
  const [textareaCols, setTextareaCols] = useState(32);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setTextareaRows(4);
        setTextareaCols(21);
      } else {
        setTextareaRows(6);
        setTextareaCols(32);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      product.title.length > 3 &&
      product.description.length > 6 &&
      product.price !== 0.1 &&
      product.images &&
      product.materials &&
      product.sizes &&
      product.colors &&
      product.tags
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [product]);

  const createProduct = async () => {
    try {
      const formData = new FormData();

      for (let i = 0; i < product.images!.length; i++) {
        formData.append(`image${i}`, product.images![i]);
      }

      formData.append("images_count", JSON.stringify(product.images!.length));
      formData.append("product", JSON.stringify(product));

      const { status, message } = await create(formData);

      if (status !== 200) {
        throw new Error(message);
      }

      toast.success(message);
      router.push("/products/all");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProduct({ ...product, images: Array.from(e.target.files) });
    }
  };

  return (
    <div className="flex items-center justify-center mx-2">
      <div className="flex flex-col items-center rounded-lg md:py-14 md:px-24 dark:bg-slate-800 dark:bg-opacity-70 my-4 px-1 py-6 bg-slate-200 bg-opacity-70">
        <FormTitle text="Create Product" />

        <CreateProductInputFields
          product={product}
          handleImageChange={handleImageChange}
          setProduct={setProduct}
          textareaRows={textareaRows}
          textareaCols={textareaCols}
        />

        <FormButton
          text="Create"
          action={createProduct}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
};
