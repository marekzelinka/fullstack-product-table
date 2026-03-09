import type { Product } from "../types.ts";
import { ProductTable } from "./product-table.tsx";

export function FilterableProductTable({ products }: { products: Product[] }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" /> Only show products in stock
      </label>
    </form>
  );
}
