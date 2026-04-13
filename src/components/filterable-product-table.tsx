import { useState } from "react";

import type { Filters, Product } from "../lib/types.ts";
import { ProductFilterForm } from "./product-filter-form.tsx";
import { ProductTable } from "./product-table.tsx";

const INITIAL_FILTERS = {
  query: "",
  selectedCategory: "",
  inStockOnly: false,
};

export function FilterableProductTable({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const baseMatches = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(filters.query.toLowerCase());
    const matchesInStock = !filters.inStockOnly || product.isStocked;

    return matchesQuery && matchesInStock;
  });
  const availableCategories = new Set(baseMatches.map((product) => product.category));
  const filteredProducts = filters.selectedCategory
    ? baseMatches.filter((product) => product.category === filters.selectedCategory)
    : baseMatches;
  const categoryOptions = [...new Set(products.map((product) => product.category))].map(
    (category) => ({
      category,
      isDisabled: !availableCategories.has(category),
    }),
  );

  return (
    <div>
      <ProductFilterForm
        values={filters}
        onChange={updateFilters}
        onReset={resetFilters}
        categoryOptions={categoryOptions}
      />
      {filteredProducts.length ? (
        <ProductTable products={filteredProducts} />
      ) : (
        <div>No products found matching "{filters.query}"</div>
      )}
    </div>
  );
}
