import { NoProducts } from "@/app/components/Products/All/NoProducts";
import { ProductsDisplay } from "@/app/components/Products/All/ProductsDisplay";
import { getAll } from "@/services/productsService";

export default async function AllProductsPage() {
  const { status, products } = await getAll();

  if (status !== 200 || products.length === 0) return <NoProducts />;

  return <ProductsDisplay products={products} />;
}

export const dynamic = "force-dynamic";
