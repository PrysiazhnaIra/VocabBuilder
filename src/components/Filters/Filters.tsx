import CategoryFilter from "../CategoryFilter/CategoryFilter";
import SearchInput from "../SearchInput/SearchInput";

import s from "./Filters.module.css";

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (newSearchTerm: string) => void;
  selectedCategory: string;
  onCategoryChange: (newCategory: string) => void;
}

export default function Filters({
  onSearchChange,
  searchTerm,
  selectedCategory,
  onCategoryChange,
}: FiltersProps) {
  return (
    <div className={s.wrapper}>
      <SearchInput searchItem={searchTerm} onSearchChange={onSearchChange} />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </div>
  );
}
