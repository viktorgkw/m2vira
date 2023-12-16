export const ProductDetailsColors = ({
  product,
  setProductState,
  productState,
}: any) => {
  return (
    <div className="flex flex-wrap items-center mb-3">
      <span className="mr-3 text-slate-800 dark:text-slate-200 font-bold">
        Colors:
      </span>

      {product?.colors.map((c: string) => {
        const isSelected =
          c === productState.color
            ? "bg-slate-800 text-slate-200 dark:text-slate-800 dark:bg-slate-200 rounded-full"
            : "text-slate-800 dark:text-slate-200";

        return (
          <p
            onClick={() =>
              setProductState({
                ...productState,
                color: c,
              })
            }
            key={c}
            className={`${isSelected} ml-1 rounded-full px-4 py-2 font-bold cursor-pointer`}
          >
            {c}
          </p>
        );
      })}
    </div>
  );
};
