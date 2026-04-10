import type { Product } from "../lib/types.ts";
import { formatCurrency } from "../lib/utils.ts";

export function ProductRow({ product }: { product: Product }) {
  const name = product.isStocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  const price = formatCurrency(product.price / 100);

  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
}
