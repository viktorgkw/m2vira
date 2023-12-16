import { redirect } from "next/navigation";
import { ProductDetails } from "@/app/components/Products/Details/ProductDetails";

export default async function ProductDetailsPage({ params }: any) {
  const res = await fetch(`${process.env.DOMAIN}/api/products/details`, {
    method: "POST",
    body: JSON.stringify({ id: params.id }),
    next: { revalidate: 5 },
  });

  const data = await res.json();

  if (data.status !== 200) {
    redirect("/products/all");
  }

  return <ProductDetails product={data.product} />;
}
