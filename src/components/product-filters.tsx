export function ProductFilters({
  filterText,
  onFilterTextChange,
  inStockOnly,
  onInStockOnlyChange,
  category,
  onCategoryChange,
  categories,
  onReset,
}: {
  filterText: string;
  onFilterTextChange: (filterText: string) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (inStockOnly: boolean) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  onReset: () => void;
}) {
  return (
    <form>
      <div>
        <input
          type="search"
          name="search"
          value={filterText}
          onChange={(event) => onFilterTextChange(event.target.value)}
          placeholder="Search..."
          aria-label="Search"
        />
        <select
          name="category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          aria-label="Category"
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
            name="isStockOnly"
            checked={inStockOnly}
            onChange={(event) => onInStockOnlyChange(event.target.checked)}
          />{" "}
          Only show products in stock
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={onReset}
          disabled={filterText === "" && !inStockOnly && category === ""}
        >
          Reset filters
        </button>
      </div>
    </form>
  );
}
