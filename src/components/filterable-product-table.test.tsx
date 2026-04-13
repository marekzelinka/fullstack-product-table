import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import type { Product } from "../lib/types.ts";
import { FilterableProductTable } from "./filterable-product-table.tsx";

const MOCK_PRODUCTS: Product[] = [
  { category: "Fruits", price: 100, isStocked: true, name: "Apple" },
  { category: "Fruits", price: 200, isStocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: 200, isStocked: true, name: "Spinach" },
  { category: "Vegetables", price: 400, isStocked: false, name: "Pumpkin" },
];

test("filters products by search query", async () => {
  const screen = await render(<FilterableProductTable products={MOCK_PRODUCTS} />);

  // Initially shows all products
  await expect.element(screen.getByRole("cell", { name: "Apple" })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: "Passionfruit" })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: "Spinach" })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: "Pumpkin" })).toBeVisible();

  await screen.getByRole("searchbox", { name: /search/i }).fill("spin");

  // Only show matching products
  await expect.element(screen.getByRole("cell", { name: "Apple" })).not.toBeInTheDocument();
  await expect.element(screen.getByRole("cell", { name: "Passionfruit" })).not.toBeInTheDocument();
  await expect.element(screen.getByRole("cell", { name: "Spinach" })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: "Pumpkin" })).not.toBeInTheDocument();
});

test("filters products when out-of-stock checkbox is toggled", async () => {
  const screen = await render(<FilterableProductTable products={MOCK_PRODUCTS} />);

  await screen.getByRole("checkbox", { name: /only show products in stock/i }).click();

  await expect.element(screen.getByRole("cell", { name: "Apple" })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: "Passionfruit" })).not.toBeInTheDocument();
  await expect.element(screen.getByRole("cell", { name: "Spinach" })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: "Pumpkin" })).not.toBeInTheDocument();
});

test("filters products on category selection", async () => {
  const screen = await render(<FilterableProductTable products={MOCK_PRODUCTS} />);

  await screen.getByRole("combobox", { name: /category/i }).selectOptions("Vegetables");

  await expect.element(screen.getByRole("cell", { name: "Apple" })).not.toBeInTheDocument();
  await expect.element(screen.getByRole("cell", { name: "Passionfruit" })).not.toBeInTheDocument();
  await expect.element(screen.getByRole("cell", { name: "Spinach" })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: "Pumpkin" })).toBeVisible();
});

test("filters can be reset", async () => {
  const screen = await render(<FilterableProductTable products={MOCK_PRODUCTS} />);
  const searchElement = screen.getByRole("searchbox", { name: /search/i });
  const checkboxElement = screen.getByRole("checkbox", { name: /only show products in stock/i });
  const selectElement = screen.getByRole("combobox", { name: /category/i });

  await searchElement.fill("spin");
  await checkboxElement.click();
  await userEvent.selectOptions(selectElement, "Vegetables");
  await selectElement.selectOptions("Vegetables");

  await screen.getByRole("button", { name: /reset filters/i }).click();

  await expect.element(searchElement).toHaveValue("");
  await expect.element(checkboxElement).not.toBeChecked();
  await expect.element(selectElement).toHaveSelection("");
});
