import type { Product } from "./types.ts";

export const PRODUCTS: Product[] = [
  { category: "Fruits", price: 100, isStocked: true, name: "Apple" },
  { category: "Fruits", price: 100, isStocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: 200, isStocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: 200, isStocked: true, name: "Spinach" },
  { category: "Vegetables", price: 400, isStocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: 100, isStocked: true, name: "Peas" },
];
