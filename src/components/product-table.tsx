import type { Product } from "../lib/types.ts";
import { ProductCategoryRow } from "./product-category-row.tsx";
import { ProductRow } from "./product-row.tsx";

export function ProductTable({
  products,
  filterText,
  inStockOnly,
}: {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}) {
  const rows = products.flatMap((product, i) => {
    if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
      return [];
    }
    if (inStockOnly && !product.isStocked) {
      return [];
    }

    const lastCategory = products.at(i - 1)?.category;
    const isNewCategory = product.category !== lastCategory;

    return [
      ...(isNewCategory
        ? [<ProductCategoryRow category={product.category} key={product.category} />]
        : []),
      <ProductRow product={product} key={product.name} />,
    ];
  }, []);

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
