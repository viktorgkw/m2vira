"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { EditProductInputFields } from "./EditProductInputFields";
import { FormButton } from "../../Global/FormButton";
import { FormTitle } from "../../Global/FormTitle";
import { CreateProductType } from "@/types/CreateProductType";
import { detailsById, edit } from "@/services/products";

export const EditProductForm = ({ id }: any) => {
  const router = useRouter();

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [product, setProduct] = useState<CreateProductType | null>();

  const [textareaRows, setTextareaRows] = useState(6);
  const [textareaCols, setTextareaCols] = useState(32);

  useEffect(() => {
    const fetchData = async () => {
      const { status, product } = await detailsById(id);

      if (status !== 200) {
        router.push("/products/all");
      }

      setProduct(product);
    };

    fetchData();
  }, [router, id]);

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

  const editProduct = async () => {
    setIsBtnDisabled(true);

    try {
      const { status, message } = await edit(product);

      if (status !== 200) {
        throw new Error(message);
      }

      toast.success(message);
      router.push("/products/all");
    } catch (err: any) {
      toast.error(err.message);
    }

    setIsBtnDisabled(false);
  };

  const handleInputChange = (
    field: string,
    value: string | string[] | number
  ) => {
    setProduct({ ...product!, [field]: value });
  };

  return (
    <div className="flex items-center justify-center my-6">
      <div className="flex flex-col items-center rounded-lg md:py-10 md:px-12 dark:bg-slate-800 dark:bg-opacity-70 bg-slate-200 bg-opacity-70 px-6 py-4">
        <FormTitle text="Edit Product" />

        <EditProductInputFields
          product={product}
          handleInputChange={handleInputChange}
          textareaCols={textareaCols}
          textareaRows={textareaRows}
        />

        <FormButton
          text="Save Changes"
          action={editProduct}
          isDisabled={isBtnDisabled}
        />
      </div>
    </div>
  );
};
