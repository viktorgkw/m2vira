import { NoProducts } from "@/app/components/Products/NoProducts";
import { ProductsDisplay } from "@/app/components/Products/ProductsDisplay";
import { getImage } from "@/helpers/firebaseStorage";

export default async function AllProducts() {
  const response = await fetch(`https://m2vira.vercel.app/api/products/all`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (data.status !== 200) return <NoProducts />;

  await Promise.all(
    data.products.map(async (p: any) => {
      p.image = await getImage(p.title);
    })
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <ProductsDisplay products={data.products} />
    </div>
  );
}
