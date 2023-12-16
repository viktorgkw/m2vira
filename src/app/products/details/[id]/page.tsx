import { redirect } from "next/navigation";
import { ProductDetails } from "@/app/components/Products/Details/ProductDetails";
import { detailsById } from "@/services/products";

export default async function ProductDetailsPage({ params }: any) {
  const { status, product } = await detailsById(params.id);

  if (status !== 200) {
    redirect("/products/all");
  }

  return <ProductDetails product={product} />;
}
