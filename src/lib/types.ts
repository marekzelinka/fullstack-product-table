export type Product = {
  category: string;
  price: number;
  isStocked: boolean;
  name: string;
};

export type Filters = {
  query: string;
  inStockOnly: boolean;
  category: string;
};
