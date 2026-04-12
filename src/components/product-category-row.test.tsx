import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { ProductCategoryRow } from "./product-category-row.tsx";

test("category row spans both columns", async () => {
  const screen = await render(
    <table>
      <tbody>
        <ProductCategoryRow category="Fruits" />
      </tbody>
    </table>,
  );

  // In Browser Mode, we can check the colSpan attribute directly
  expect(screen.getByRole("rowheader", { name: "Fruits" }).element().getAttribute("colspan")).toBe(
    "2",
  );
});
