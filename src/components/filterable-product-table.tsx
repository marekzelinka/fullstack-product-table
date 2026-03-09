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
        onFilterTextChange={setFilterText}
        shouldDisplayOnlyStocked={shouldDisplayOnlyStocked}
        onShouldDisplayOnlyStockedChange={setShouldDisplayOnlyStocked}
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
  onFilterTextChange,
  shouldDisplayOnlyStocked,
  onShouldDisplayOnlyStockedChange,
}: {
  filterText: string;
  onFilterTextChange: (filterText: string) => void;
  shouldDisplayOnlyStocked: boolean;
  onShouldDisplayOnlyStockedChange: (shouldDisplayOnlyStocked: boolean) => void;
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
          checked={shouldDisplayOnlyStocked}
          onChange={(event) =>
            onShouldDisplayOnlyStockedChange(event.target.checked)
          }
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}
