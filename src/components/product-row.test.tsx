import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import type { Product } from "../lib/types.ts";
import { ProductRow } from "./product-row.tsx";

const MOCK_PRODUCT: Product = { category: "Fruits", price: 100, isStocked: true, name: "Apple" };
const OUT_OF_STOCK_PRODUCT: Product = { ...MOCK_PRODUCT, isStocked: false };

test("renders prooduct name and formatted price", async () => {
  const screen = await render(
    <table>
      <tbody>
        <ProductRow product={MOCK_PRODUCT} />
      </tbody>
    </table>,
  );

  // await expect.element(screen.getByText("Apple")).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: "Apple" })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: "£1.00" })).toBeVisible();
});

test("renders out-of-stock product inside a span", async () => {
  const screen = await render(
    <table>
      <tbody>
        <ProductRow product={OUT_OF_STOCK_PRODUCT} />
      </tbody>
    </table>,
  );

  await expect
    .element(screen.getByRole("cell", { name: "Apple" }).element().querySelector("span"))
    .toBeVisible();
});
