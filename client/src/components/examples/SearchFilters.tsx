import { SearchFilters } from "../SearchFilters";

export default function SearchFiltersExample() {
  return (
    <div className="p-4">
      <SearchFilters onSearch={(q) => console.log("Search:", q)} />
    </div>
  );
}
