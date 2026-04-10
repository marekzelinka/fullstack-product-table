import { describe, expect, test } from "vitest";

import { formatPrice } from "./utils.ts";

describe("formatPrice", () => {
  test("formats USD prices", () => {
    expect(formatPrice(10, "USD")).toBe("$10.00");
  });

  test("formats GBP prices", () => {
    expect(formatPrice(10, "GBP")).toBe("£10.00");
  });

  test("handles invalid currency", () => {
    expect(formatPrice(10, "LOL")).toBe("LOL 10.00");
  });

  test("handles zero", () => {
    expect(formatPrice(0, "USD")).toBe("$0.00");
  });

  test("handles negative amounts", () => {
    expect(formatPrice(-5.5, "USD")).toBe("-$5.50");
  });

  test("rounds to two decimal places", () => {
    expect(formatPrice(10.999, "USD")).toBe("$11.00");
  });
});
