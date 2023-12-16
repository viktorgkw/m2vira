import { ProductImagesSection } from "./ProductImagesSection";
import { ProductDetailsInfo } from "./ProductDetailsInfo";

export const ProductDetails = ({ product }: any) => {
  return (
    <section className="body-font overflow-hidden">
      <div className="container px-2 py-24 mx-auto cursor-default">
        <ProductDetailsInfo product={product} />

        <ProductImagesSection product={product} />
      </div>
    </section>
  );
};
