import type { ReactElement } from "react";
import type { Product } from "../types.ts";

export function ProductTable({
  products,
  filterText,
  inStockOnly,
}: {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}) {
  const rows = products.reduce<ReactElement[]>((rows, product, i) => {
    if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
      return rows;
    }
    if (inStockOnly && !product.isStocked) {
      return rows;
    }

    const lastCategory = products.at(i - 1)?.category;

    const isNewCategory = product.category !== lastCategory;
    if (isNewCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);

    return rows;
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

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({ product }: { product: Product }) {
  const name = product.isStocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  const price = (product.price / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
}
