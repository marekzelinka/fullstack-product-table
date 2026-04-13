import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ProductFilterForm } from "./product-filter-form.tsx";

test("displays the correct initial values", async () => {
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

  await expect.element(screen.getByRole("searchbox", { name: /search/i })).toHaveValue("Apple");
  await expect.element(screen.getByRole("combobox", { name: /select/i })).toHaveSelection("");
  await expect.element(screen.getByRole("checkbox", { name: /show/i })).toBeChecked();
  await expect.element(screen.getByRole("button", { name: /clear/i })).toBeEnabled();
});

test("clear filters button is disabled when filters are initial", async () => {
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

  await expect.element(screen.getByRole("button", { name: /clear/i })).not.toBeEnabled();
});

test("calls onChange event handler with correct values everytime we update the form", async () => {
  const mockOnChange = vi.fn();
  const screen = await render(
    <ProductFilterForm
      values={{
        query: "",
        selectedCategory: "",
        inStockOnly: false,
      }}
      onChange={mockOnChange}
      categoryOptions={[{ category: "Vegetables", isDisabled: false }]}
      onReset={vi.fn()}
    />,
  );

  await screen.getByRole("searchbox", { name: /search/i }).fill("Apple");
  expect(mockOnChange).toHaveBeenCalledWith({ query: "Apple" });

  await screen.getByRole("combobox", { name: /select/i }).selectOptions("Vegetables");
  expect(mockOnChange).toHaveBeenCalledWith({ selectedCategory: "Vegetables" });

  await screen.getByRole("checkbox", { name: /show/i }).click();
  expect(mockOnChange).toHaveBeenCalledWith({ inStockOnly: true });
});

test("onChange event handler should not be called then a category is disabled", async () => {
  const mockOnChange = vi.fn();
  const screen = await render(
    <ProductFilterForm
      values={{
        query: "",
        selectedCategory: "",
        inStockOnly: false,
      }}
      onChange={mockOnChange}
      categoryOptions={[{ category: "Vegetables", isDisabled: true }]}
      onReset={vi.fn()}
    />,
  );

  await expect(
    screen.getByRole("combobox", { name: /select/i }).selectOptions("Vegetables"),
  ).rejects.toThrow();
  expect(mockOnChange).not.toHaveBeenCalledWith({ selectedCategory: "Vegetables" });
});
