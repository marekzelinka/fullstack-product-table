import { useState } from "react";
import type { Product } from "../types.ts";
import { ProductTable } from "./product-table.tsx";

export function FilterableProductTable({ products }: { products: Product[] }) {
  const [filterText, setFilterText] = useState("");
  const [shouldDisplayOnlyStocked, setShouldDisplayOnlyStocked] =
    useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        shouldDisplayOnlyStocked={shouldDisplayOnlyStocked}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        shouldDisplayOnlyStocked={shouldDisplayOnlyStocked}
      />
    </div>
  );
}

function SearchBar({
  filterText,
  shouldDisplayOnlyStocked,
}: {
  filterText: string;
  shouldDisplayOnlyStocked: boolean;
}) {
  return (
    <form>
      <input type="text" placeholder="Search..." value={filterText} />
      <label>
        <input type="checkbox" checked={shouldDisplayOnlyStocked} /> Only show
        products in stock
      </label>
    </form>
  );
}
