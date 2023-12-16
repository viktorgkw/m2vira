export const CreateProductInputFields = ({
  product,
  handleImageChange,
  setProduct,
  textareaRows,
  textareaCols,
}: any) => {
  return (
    <>
      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Images
      </label>

      <input
        className="p-2 rounded-lg mb-4 dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-96 w-full outline-none text-slate-200 bg-slate-800"
        type="file"
        multiple
        accept="image/png"
        onChange={(e) => handleImageChange(e)}
      />

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Title
      </label>

      <input
        className="p-2 rounded-lg mb-4 dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-96 w-full outline-none text-slate-200 bg-slate-800"
        type="text"
        value={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
        placeholder="Title"
      />

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Description
      </label>

      <textarea
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
        rows={textareaRows}
        cols={textareaCols}
        className="p-2 rounded-lg mb-4 dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-96 w-full outline-none text-slate-200 bg-slate-800 resize-none"
        placeholder="Description"
      ></textarea>

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Price
      </label>

      <input
        className="p-2 rounded-lg mb-4 dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-96 w-full outline-none text-slate-200 bg-slate-800"
        type="number"
        min={0.1}
        step={0.1}
        value={product.price}
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
        placeholder="Price"
      />

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Sizes
      </label>

      <input
        className="p-2 rounded-lg mb-4 dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-96 w-full outline-none text-slate-200 bg-slate-800"
        type="text"
        value={product.sizes}
        onChange={(e) => setProduct({ ...product, sizes: e.target.value })}
        placeholder="Use separator ,"
      />

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Colors
      </label>

      <input
        className="p-2 rounded-lg mb-4 dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-96 w-full outline-none text-slate-200 bg-slate-800"
        type="text"
        value={product.colors}
        onChange={(e) => setProduct({ ...product, colors: e.target.value })}
        placeholder="Use separator ,"
      />

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Materials
      </label>

      <input
        className="p-2 rounded-lg mb-4 dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-96 w-full outline-none text-slate-200 bg-slate-800"
        type="text"
        value={product.materials}
        onChange={(e) => setProduct({ ...product, materials: e.target.value })}
        placeholder="Use separator ,"
      />

      <label className="dark:text-slate-200 text-slate-800 font-bold text-lg md:text-xl drop-shadow-lg">
        Tags
      </label>

      <input
        className="p-2 rounded-lg mb-4 dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-96 w-full outline-none text-slate-200 bg-slate-800"
        type="text"
        value={product.tags}
        onChange={(e) => setProduct({ ...product, tags: e.target.value })}
        placeholder="Use separator ,"
      />
    </>
  );
};
