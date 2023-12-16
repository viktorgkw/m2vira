export const SizesFilter = ({ setSize }: any) => {
  return (
    <div className="flex flex-col items-center justify-center text-slate-800 dark:text-slate-200 font-bold">
      <p className="text-xl mb-2">Size</p>

      <div className="flex flex-row flex-wrap">
        <select
          onChange={(e) => setSize(e.target.value)}
          className="block w-full text-sm text-white rounded-lg bg-slate-800 font-bold p-1 cursor-pointer"
        >
          <option value="all">All</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};
