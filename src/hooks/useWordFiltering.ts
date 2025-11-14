import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

interface FilteringHookResult {
  searchTerm: string;
  selectedCategory: string;
  debouncedSearchTerm: string;
  handleSearchChange: (newSearchTerm: string) => void;
  handleCategoryChange: (newCategory: string) => void;
}

const useWordFiltering = (): FilteringHookResult => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const debouncedSearchTerm = useDebounce(searchTerm, 300).trim();

  const handleSearchChange = (newSearchTerm: string): void => {
    setSearchTerm(newSearchTerm);
  };

  const handleCategoryChange = (newCategory: string): void => {
    setSelectedCategory(newCategory);
  };

  return {
    searchTerm,
    selectedCategory,
    debouncedSearchTerm,
    handleSearchChange,
    handleCategoryChange,
  };
};

export default useWordFiltering;
