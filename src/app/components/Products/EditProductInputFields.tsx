export const EditProductInputFields = ({
  product,
  handleInputChange,
  textareaCols,
  textareaRows,
}: any) => {
  return (
    <>
      <label className="dark:text-slate-200 text-slate-800  font-bold text-lg md:text-xl drop-shadow-lg">
        Title
      </label>

      <input
        className="p-2 rounded-lg mb-4 dark:text-slate-800 drop-shadow-lg md:w-96 w-fit outline-none dark:bg-slate-200 bg-slate-800 text-slate-200"
        type="text"
        value={product?.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        placeholder="Title"
      />

      <label className="dark:text-slate-200 text-slate-800  font-bold text-lg md:text-xl drop-shadow-lg">
        Description
      </label>

      <textarea
        value={product?.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        rows={textareaRows}
        cols={textareaCols}
        className="p-2 rounded-lg mb-4 dark:text-slate-800 drop-shadow-lg md:w-96 w-fit outline-none dark:bg-slate-200 resize-none bg-slate-800 text-slate-200"
        placeholder="Description"
      ></textarea>

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Price
      </label>

      <input
        className="p-2 rounded-lg mb-4 dark:text-slate-800 drop-shadow-lg md:w-96 w-fit outline-none dark:bg-slate-200 bg-slate-800 text-slate-200"
        type="number"
        min={0.1}
        step={0.1}
        value={product?.price}
        onChange={(e) => handleInputChange("price", Number(e.target.value))}
        placeholder="Price"
      />

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Sizes
      </label>

      <input
        className="p-2 rounded-lg mb-4 dark:text-slate-800 drop-shadow-lg md:w-96 w-fit outline-none dark:bg-slate-200 bg-slate-800 text-slate-200"
        type="text"
        value={product?.sizes}
        onChange={(e) => handleInputChange("sizes", e.target.value.split(","))}
        placeholder="Use separator ,"
      />

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Colors
      </label>

      <input
        className="p-2 rounded-lg mb-4 bg-slate-800 text-slate-200 dark:text-slate-800 drop-shadow-lg md:w-96 w-fit outline-none dark:bg-slate-200"
        type="text"
        value={product?.colors}
        onChange={(e) => handleInputChange("colors", e.target.value.split(","))}
        placeholder="Use separator ,"
      />

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Materials
      </label>

      <input
        className="p-2 rounded-lg mb-4 bg-slate-800 text-slate-200 dark:text-slate-800 drop-shadow-lg md:w-96 w-fit outline-none dark:bg-slate-200"
        type="text"
        value={product?.materials}
        onChange={(e) =>
          handleInputChange("materials", e.target.value.split(","))
        }
        placeholder="Use separator ,"
      />

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Tags
      </label>

      <input
        className="p-2 rounded-lg mb-4 bg-slate-800 text-slate-200 dark:text-slate-800 drop-shadow-lg md:w-96 w-fit outline-none dark:bg-slate-200"
        type="text"
        value={product?.tags}
        onChange={(e) => handleInputChange("tags", e.target.value.split(","))}
        placeholder="Use separator ,"
      />
    </>
  );
};
