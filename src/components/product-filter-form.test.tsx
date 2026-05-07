import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ProductFilterForm } from "./product-filter-form.tsx";

test("renders with initial values", async () => {
  const screen = await render(
    <ProductFilterForm
      values={{
        query: "Apple",
        selectedCategory: "",
        inStockOnly: true,
      }}
      onChange={vi.fn()}
      categoryOptions={[]}
      onReset={vi.fn()}
    />,
  );

  await expect
    .element(screen.getByRole("searchbox", { name: /search by product name/i }))
    .toHaveValue("Apple");
  await expect
    .element(screen.getByRole("combobox", { name: /select a product category/i }))
    .toHaveSelection("");
  await expect
    .element(screen.getByRole("checkbox", { name: /only show products in stock/i }))
    .toBeChecked();
  await expect
    .element(
      screen.getByRole("button", {
        name: /clear filters/i,
      }),
    )
    .toBeEnabled();
});

test("clear filters button is disabled when filters are initial", async () => {
  const onReset = vi.fn();
  const screen = await render(
    <ProductFilterForm
      values={{ query: "Apple", selectedCategory: "", inStockOnly: false }}
      onChange={vi.fn()}
      categoryOptions={[]}
      onReset={onReset}
    />,
  );

  await screen.getByRole("button", { name: /clear filters/i }).click();

  expect(onReset).toHaveBeenCalledTimes(1);
});

test("clear filters button is enabled when filters are updated", async () => {
  const screen = await render(
    <ProductFilterForm
      values={{
        query: "",
        selectedCategory: "",
        inStockOnly: false,
      }}
      onChange={vi.fn()}
      categoryOptions={[]}
      onReset={vi.fn()}
    />,
  );

  await expect
    .element(
      screen.getByRole("button", {
        name: /clear filters/i,
      }),
    )
    .toBeDisabled();
});

test("calls onChange event handler with correct value on every update", async () => {
  const onChange = vi.fn();
  const screen = await render(
    <ProductFilterForm
      values={{ query: "", selectedCategory: "", inStockOnly: false }}
      onChange={onChange}
      categoryOptions={[{ category: "Vegetables", isDisabled: false }]}
      onReset={vi.fn()}
    />,
  );

  await screen.getByRole("searchbox", { name: /search by product name/i }).fill("Apple");
  expect(onChange).toHaveBeenNthCalledWith(1, { query: "Apple" });

  await screen
    .getByRole("combobox", { name: /select a product category/i })
    .selectOptions("Vegetables");
  expect(onChange).toHaveBeenNthCalledWith(2, { selectedCategory: "Vegetables" });

  await screen.getByRole("checkbox", { name: /only show products in stock/i }).click();
  expect(onChange).toHaveBeenNthCalledWith(3, { inStockOnly: true });

  expect(onChange).toHaveBeenCalledTimes(3);
});

test("does not call onChange event handler when a category is disabled", async () => {
  const screen = await render(
    <ProductFilterForm
      values={{
        query: "",
        selectedCategory: "",
        inStockOnly: false,
      }}
      onChange={vi.fn()}
      categoryOptions={[{ category: "Vegetables", isDisabled: true }]}
      onReset={vi.fn()}
    />,
  );

  await expect
    .element(
      screen.getByRole("option", {
        name: /Vegetables/i,
      }),
    )
    .toBeDisabled();
});
