export function ProductSearchBar({
  filterText,
  onFilterTextChange,
  inStockOnly,
  setInStockOnly,
}: {
  filterText: string;
  onFilterTextChange: (filterText: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (inStockOnly: boolean) => void;
}) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(event) => onFilterTextChange(event.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => setInStockOnly(event.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}
