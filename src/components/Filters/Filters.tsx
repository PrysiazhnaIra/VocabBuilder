import { useMemo, useState } from "react";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import SearchInput from "../SearchInput/SearchInput";
import useDebounce from "../../hooks/useDebounce";
import s from "./Filters.module.css";

export default function Filters() {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const trimmedSearchTerm = useMemo(() => {
    return debouncedSearchTerm.trim();
  }, [debouncedSearchTerm]);

  console.log("Trimmed Search Term:", trimmedSearchTerm);

  const handleSearchChange = (newSearchTerm: string): void => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className={s.wrapper}>
      <SearchInput
        searchItem={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <CategoryFilter />
    </div>
  );
}
