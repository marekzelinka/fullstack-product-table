import type { Product } from "../lib/types.ts";
import { ProductCategoryRow } from "./product-category-row.tsx";
import { ProductRow } from "./product-row.tsx";

export function ProductTable({ products }: { products: Product[] }) {
  const rows = [];
  let lastCategory: string | undefined = undefined;

  for (const product of products) {
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} category={product.category} />);
    }

    rows.push(<ProductRow key={product.name} product={product} />);

    lastCategory = product.category;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
