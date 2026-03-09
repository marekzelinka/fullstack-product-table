import { useState } from "react";
import type { Product } from "../types.ts";
import { ProductTable } from "./product-table.tsx";

export function FilterableProductTable({ products }: { products: Product[] }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function SearchBar({
  filterText,
  onFilterTextChange,
  inStockOnly,
  setInStockOnly,
}: {
  filterText: string;
  onFilterTextChange: (filterText: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (inStockOnly: boolean) => void;
}) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(event) => onFilterTextChange(event.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => setInStockOnly(event.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}
