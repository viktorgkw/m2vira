import { NoProducts } from "@/app/components/Products/All/NoProducts";
import { ProductsDisplay } from "@/app/components/Products/All/ProductsDisplay";

export default async function AllProducts() {
  const res = await fetch(`${process.env.DOMAIN}/api/products/all`, {
    next: { revalidate: 5 },
  });

  const data = await res.json();

  if (data.status !== 200 || data.products.length === 0) return <NoProducts />;

  return <ProductsDisplay products={data.products} />;
}
