export const ProductDetailsSizes = ({
  product,
  setProductState,
  productState,
}: any) => {
  return (
    <div className="flex items-center mb-3">
      <span className="text-slate-800 dark:text-slate-200 font-bold mr-3">
        Sizes:
      </span>

      <div>
        <select
          onChange={(e) =>
            setProductState({
              ...productState,
              size: e.target.value,
            })
          }
          className="block w-full text-sm text-slate-200 dark:text-slate-800 rounded-lg bg-slate-800 dark:bg-slate-200 font-bold p-1 cursor-pointer"
        >
          {product?.sizes.map((s: string) => {
            return <option key={s}>{s}</option>;
          })}
        </select>
      </div>
    </div>
  );
};
