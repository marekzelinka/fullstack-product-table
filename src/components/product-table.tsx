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
        ? [
            <ProductCategoryRow
              category={product.category}
              key={product.category}
            />,
          ]
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
