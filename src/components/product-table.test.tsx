import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import type { Product } from "../lib/types.ts";
import { ProductTable } from "./product-table.tsx";

const MOCK_PRODUCTS: Product[] = [
  { category: "Fruits", price: 100, isStocked: true, name: "Apple" },
  { category: "Vegetables", price: 200, isStocked: false, name: "Spinach" },
];

test("renders category headers only when the category changes", async () => {
  const screen = await render(
    <ProductTable products={MOCK_PRODUCTS} filterText="" inStockOnly={false} category="" />,
  );

  // Verify that both categories only appear once as a category header
  await expect.element(screen.getByRole("row", { name: "Fruits" })).toBeVisible();
  await expect.element(screen.getByRole("row", { name: "Vegetables" })).toBeVisible();
});

test("shows no rows when nothing matches the filter", async () => {
  const screen = await render(
    <ProductTable
      products={MOCK_PRODUCTS}
      filterText="Non-existent"
      inStockOnly={false}
      category=""
    />,
  );

  await expect
    .element(screen.getByRole("row", { name: /No products found matching "Non-existent"/i }))
    .toBeVisible();

  await expect.element(screen.getByRole("row", { name: "Fruits" })).not.toBeInTheDocument();
  await expect.element(screen.getByRole("cell", { name: "Apple" })).not.toBeInTheDocument();
  await expect.element(screen.getByRole("row", { name: "Vegetables" })).not.toBeInTheDocument();
  await expect.element(screen.getByRole("cell", { name: "Spinach" })).not.toBeInTheDocument();
});

test("orders elements correctly: Category followed by its Products", async () => {
  const screen = await render(
    <ProductTable products={MOCK_PRODUCTS} filterText="" inStockOnly={false} category="" />,
  );
  const rows = screen.getByRole("row").all();

  // Correct order is: header, category, product (1), category, product (1)
  expect(rows[1].element().textContent).toContain("Fruits");
  expect(rows[2].element().textContent).toContain("Apple");
  expect(rows[3].element().textContent).toContain("Vegetables");
  expect(rows[4].element().textContent).toContain("Spinach");
});
