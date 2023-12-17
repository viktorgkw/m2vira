"use client";

import { useEffect, useState } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { NoData } from "../../Global/NoData";
import { Filters } from "./Filters";
import { Product } from "./Product";
import { ProductDisplayType } from "@/types/ProductDisplayType";

config.autoAddCss = false;

export const ProductsDisplay = ({ products }: { products: any[] }) => {
  const [filteredProducts, setFilteredProducts] =
    useState<ProductDisplayType[]>(products);
  const [gender, setGender] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [size, setSize] = useState("all");

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(searchTerm.replace(/[^a-zA-Z0-9\s]/g, ""))
    );

    if (gender !== "all") {
      filtered = filtered.filter((product) => product.tags.includes(gender));
    }

    if (size !== "all") {
      filtered = filtered.filter((product) => product.sizes.includes(size));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, gender, products, size]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Filters
        setGender={setGender}
        setSize={setSize}
        setSearchTerm={setSearchTerm}
      />

      {filteredProducts.length === 0 ? (
        <NoData text="No products found that match your search!" />
      ) : (
        <div className="flex flex-wrap items-center justify-center my-6">
          {filteredProducts.map((p: ProductDisplayType) => (
            <Product key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
