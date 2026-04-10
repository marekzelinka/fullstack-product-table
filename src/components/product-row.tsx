import type { Product } from "../lib/types.ts";
import { formatPrice } from "../lib/utils.ts";

export function ProductRow({ product }: { product: Product }) {
  const name = product.isStocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  const price = formatPrice(product.price / 100, "GBP");

  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
}
