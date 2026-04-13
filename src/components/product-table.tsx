import type { Filters, Product } from "../lib/types.ts";
import { ProductCategoryRow } from "./product-category-row.tsx";
import { ProductRow } from "./product-row.tsx";

export function ProductTable({ products, filters }: { products: Product[]; filters: Filters }) {
  const rows = products.flatMap((product, i) => {
    if (!product.name.toLowerCase().includes(filters.query.toLowerCase())) {
      return [];
    }
    if (filters.inStockOnly && !product.isStocked) {
      return [];
    }

    if (filters.selectedCategory !== "" && product.category !== filters.selectedCategory) {
      return [];
    }

    const lastCategory = products.at(i - 1)?.category;
    const isNewCategory = product.category !== lastCategory;

    return [
      ...(isNewCategory
        ? [<ProductCategoryRow key={product.category} category={product.category} />]
        : []),
      <ProductRow key={product.name} product={product} />,
    ];
  }, []);

  return (
    <table>
      {rows.length ? (
        <>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </>
      ) : (
        <tbody>
          <tr>
            <td colSpan={2}>No products found matching "{filters.query}"</td>
          </tr>
        </tbody>
      )}
    </table>
  );
}
