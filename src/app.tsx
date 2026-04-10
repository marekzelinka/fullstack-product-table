import { FilterableProductTable } from "./components/filterable-product-table.tsx";
import { PRODUCTS } from "./data/products.ts";

export function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
