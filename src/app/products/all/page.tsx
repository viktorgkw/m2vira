import { NoProducts } from "@/app/components/Products/NoProducts";
import { ProductsDisplay } from "@/app/components/Products/ProductsDisplay";

export default async function AllProducts() {
  const res = await fetch(`https://m2vira.vercel.app/api/products/all`, {
    next: { revalidate: 5 },
  });

  const data = await res.json();

  if (data.status !== 200 || data.products.length === 0) return <NoProducts />;

  return (
    <div className="flex flex-col items-center justify-center">
      <ProductsDisplay products={data.products} />
    </div>
  );
}
