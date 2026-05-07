import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

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
  await expect.element(screen.getByRole("cell", { name: /apple/i })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: /passionfruit/i })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: /spinach/i })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: /pumpkin/i })).toBeVisible();

  await screen.getByRole("searchbox", { name: /search by product name/i }).fill("spin");

  await expect.element(screen.getByRole("cell", { name: /apple/i })).not.toBeInTheDocument();
  await expect
    .element(
      screen.getByRole("cell", {
        name: /passionfruit/i,
      }),
    )
    .not.toBeInTheDocument();
  await expect.element(screen.getByRole("cell", { name: /spinach/i })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: /pumpkin/i })).not.toBeInTheDocument();
});

test("filters products when out-of-stock checkbox is toggled", async () => {
  const screen = await render(<FilterableProductTable products={MOCK_PRODUCTS} />);
  await screen.getByRole("checkbox", { name: /only show products in stock/i }).click();

  await expect.element(screen.getByRole("cell", { name: /apple/i })).toBeVisible();
  await expect
    .element(
      screen.getByRole("cell", {
        name: /passionfruit/i,
      }),
    )
    .not.toBeInTheDocument();
  await expect.element(screen.getByRole("cell", { name: /spinach/i })).toBeVisible();
  await expect
    .element(
      screen.getByRole("cell", {
        name: /pumpkin/i,
      }),
    )
    .not.toBeInTheDocument();
});

test("filters products on category selection", async () => {
  const screen = await render(<FilterableProductTable products={MOCK_PRODUCTS} />);
  await screen
    .getByRole("combobox", { name: /select a product category/i })
    .selectOptions("Vegetables");

  await expect.element(screen.getByRole("cell", { name: /apple/i })).not.toBeInTheDocument();
  await expect
    .element(
      screen.getByRole("cell", {
        name: /passionfruit/i,
      }),
    )
    .not.toBeInTheDocument();
  await expect.element(screen.getByRole("cell", { name: /spinach/i })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: /pumpkin/i })).toBeVisible();
});

test("filters can be cleared", async () => {
  const screen = await render(<FilterableProductTable products={MOCK_PRODUCTS} />);
  const searchElement = screen.getByRole("searchbox", {
    name: /search by product name/i,
  });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /only show products in stock/i,
  });
  const selectElement = screen.getByRole("combobox", {
    name: /select a product category/i,
  });
  await searchElement.fill("spin");
  await checkboxElement.click();
  await selectElement.selectOptions("Vegetables");

  await screen.getByRole("button", { name: /clear filters/i }).click();

  await expect.element(searchElement).toHaveValue("");
  await expect.element(checkboxElement).not.toBeChecked();
  await expect.element(selectElement).toHaveSelection("");
});

test("shows empty state message when no products match filters", async () => {
  const screen = await render(<FilterableProductTable products={MOCK_PRODUCTS} />);
  await screen
    .getByRole("searchbox", { name: /search by product name/i })
    .fill("non-existing-product");

  await expect
    .element(screen.getByText(/No products found matching "non-existing-product"/i))
    .toBeVisible();
  await expect.element(screen.getByRole("table")).not.toBeInTheDocument();
});

test("disables categories that have no matches for current search", async () => {
  const screen = await render(<FilterableProductTable products={MOCK_PRODUCTS} />);
  // Search for "Spin", which only exists in category Vegetables
  await screen.getByRole("searchbox", { name: /search by product name/i }).fill("Spin");

  // Category "Fruits" should be disabled, "Vegetables" should be enabled
  await expect.element(screen.getByRole("option", { name: /fruits/i })).toBeDisabled();
  await expect
    .element(
      screen.getByRole("option", {
        name: /vegetables/i,
      }),
    )
    .not.toBeDisabled();
});
