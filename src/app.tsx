import { FilterableProductTable } from "./components/filterable-product-table.tsx";
import { PRODUCTS } from "./data.ts";

export function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
