import type { ReactElement } from "react";
import type { Product } from "../types.ts";

export function ProductTable({ products }: { products: Product[] }) {
  const rows = products.reduce<ReactElement[]>((acc, product, i) => {
    const lastCategory = products.at(i - 1)?.category;
    if (product.category !== lastCategory) {
      acc.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
    }

    acc.push(<ProductRow product={product} key={product.name} />);

    return acc;
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

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
