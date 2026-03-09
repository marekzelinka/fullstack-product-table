import type { Product } from "./types.ts";

export const PRODUCTS: Product[] = [
  { category: "Fruits", price: "$1", isStocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", isStocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", isStocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", isStocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", isStocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", isStocked: true, name: "Peas" },
];
