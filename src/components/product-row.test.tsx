import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { ProductRow } from "./product-row.tsx";

const MOCK_PRODUCT = { category: "Fruits", price: 100, isStocked: true, name: "Apple" };
const OUT_OF_STOCK_PRODUCT = { ...MOCK_PRODUCT, isStocked: false };

test("renders with name and formatted price", async () => {
  const screen = await render(
    <table>
      <tbody>
        <ProductRow product={MOCK_PRODUCT} />
      </tbody>
    </table>,
  );

  await expect.element(screen.getByRole("cell", { name: /apple/i })).toBeVisible();
  await expect.element(screen.getByRole("cell", { name: /£1.00/i })).toBeVisible();
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
    .element(
      screen
        .getByRole("cell", {
          name: /apple/i,
        })
        .element()
        .querySelector("span"),
    )
    .toBeVisible();
});
