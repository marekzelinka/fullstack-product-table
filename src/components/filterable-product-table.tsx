import { useState } from "react";

import type { Product } from "../lib/types.ts";
import { ProductFilters } from "./product-filters.tsx";
import { ProductTable } from "./product-table.tsx";

export function FilterableProductTable({ products }: { products: Product[] }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [category, setCategory] = useState("");

  const categories = [...new Set(products.map((product) => product.category))];

  const resetFilters = () => {
    setFilterText("");
    setInStockOnly(false);
    setCategory("");
  };

  return (
    <div>
      <ProductFilters
        filterText={filterText}
        onFilterTextChange={setFilterText}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={setInStockOnly}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        onReset={resetFilters}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
        category={category}
      />
    </div>
  );
}
