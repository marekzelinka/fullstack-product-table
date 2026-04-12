import type { Product } from "../lib/types.ts";

export function ProductCategoryRow({ category }: { category: Product["category"] }) {
  return (
    <tr>
      <th colSpan={2} scope="row">
        {category}
      </th>
    </tr>
  );
}
