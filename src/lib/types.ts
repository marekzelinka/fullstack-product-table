export type Product = {
  category: string;
  price: number;
  isStocked: boolean;
  name: string;
};

export type Filters = {
  query: string;
  selectedCategory: string;
  inStockOnly: boolean;
};
