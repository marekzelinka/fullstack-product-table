import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import type { Product } from "../lib/types.ts";
import { ProductTable } from "./product-table.tsx";

const MOCK_PRODUCTS: Product[] = [
  { category: "Fruits", price: 100, isStocked: true, name: "Apple" },
  { category: "Vegetables", price: 200, isStocked: false, name: "Spinach" },
];

test("renders category headers only when the category changes", async () => {
  const screen = await render(<ProductTable products={MOCK_PRODUCTS} />);

  await expect.element(screen.getByRole("row", { name: /fruits/i })).toBeVisible();
  await expect.element(screen.getByRole("row", { name: /vegetables/i })).toBeVisible();
});

test("orders elements correctly", async () => {
  const screen = await render(<ProductTable products={MOCK_PRODUCTS} />);
  const rows = screen.getByRole("row").all();

  // Correct order is: header, category and product(s) repeating
  expect(rows[1].element().textContent).toContain("Fruits");
  expect(rows[2].element().textContent).toContain("Apple");
  expect(rows[3].element().textContent).toContain("Vegetables");
  expect(rows[4].element().textContent).toContain("Spinach");
});
