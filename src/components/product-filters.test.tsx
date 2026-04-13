import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ProductFilters } from "./product-filters.tsx";

test("displays the correct initial values from props", async () => {
  const screen = await render(
    <ProductFilters
      filterText="Initial Query"
      onFilterTextChange={vi.fn()}
      inStockOnly={true}
      onInStockOnlyChange={vi.fn()}
      category=""
      onCategoryChange={vi.fn()}
      categories={["Vegetables"]}
      onReset={vi.fn()}
    />,
  );

  await expect
    .element(screen.getByRole("textbox", { name: /search/i }))
    .toHaveValue("Initial Query");
  await expect.element(screen.getByRole("combobox", { name: /category/i })).toHaveSelection("");
  await expect
    .element(screen.getByRole("checkbox", { name: /only show products in stock/i }))
    .toBeChecked();
  await expect.element(screen.getByRole("button", { name: /reset filters/i })).toBeEnabled();
});

test("calls event handlers with correct values", async () => {
  const mockOnFilterTextChange = vi.fn();
  const mockOnInStockOnlyChange = vi.fn();
  const mockOnCategoryChange = vi.fn();
  const screen = await render(
    <ProductFilters
      filterText=""
      onFilterTextChange={mockOnFilterTextChange}
      inStockOnly={false}
      onInStockOnlyChange={mockOnInStockOnlyChange}
      category=""
      onCategoryChange={mockOnCategoryChange}
      categories={["Vegetables"]}
      onReset={vi.fn()}
    />,
  );

  await screen.getByRole("textbox", { name: /search/i }).fill("Apple");
  await screen.getByRole("checkbox", { name: /only show products in stock/i }).click();
  await screen.getByRole("combobox", { name: /category/i }).selectOptions("Vegetables");

  expect(mockOnFilterTextChange).toHaveBeenCalledWith("Apple");
  expect(mockOnInStockOnlyChange).toHaveBeenCalledWith(true);
  expect(mockOnCategoryChange).toHaveBeenCalledWith("Vegetables");
});
