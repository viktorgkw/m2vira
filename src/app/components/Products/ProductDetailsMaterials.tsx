export const ProductDetailsMaterials = ({ product }: any) => {
  return (
    <div className="flex flex-wrap items-center font-bold">
      <span className="text-slate-800 mr-3 dark:text-slate-200">
        Materials:
      </span>

      <div className="text-slate-800 dark:text-slate-200">
        {product?.materials.join("/")}
      </div>
    </div>
  );
};
