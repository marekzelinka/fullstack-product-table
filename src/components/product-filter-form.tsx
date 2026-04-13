import type { Filters, Product } from "../lib/types";

export function ProductFilterForm({
  values,
  onChange,
  onReset,
  categories,
}: {
  values: Filters;
  onChange: (values: Partial<Filters>) => void;
  onReset: () => void;
  categories: Product["category"][];
}) {
  return (
    <form>
      <div>
        <input
          type="search"
          name="query"
          value={values.query}
          onChange={(event) => onChange({ [event.target.name]: event.target.value })}
          placeholder="Search..."
          aria-label="Search by product name"
        />
        <select
          name="selectedCategory"
          value={values.selectedCategory}
          onChange={(event) => onChange({ [event.target.name]: event.target.value })}
          aria-label="Select a product category"
        >
          <option value="">All categories</option>
          {categories.map((categoryOption) => (
            <option key={categoryOption}>{categoryOption}</option>
          ))}
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="inStockOnly"
            checked={values.inStockOnly}
            onChange={(event) => onChange({ [event.target.name]: event.target.checked })}
          />{" "}
          Only show products in stock
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={onReset}
          disabled={values.query === "" && !values.inStockOnly && values.selectedCategory === ""}
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}
