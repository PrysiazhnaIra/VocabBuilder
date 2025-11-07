import { useState, useMemo } from "react";
import type { Word } from "../types/types";
import useDebounce from "../hooks/useDebounce";

interface FilteringHookResult {
  searchTerm: string;
  selectedCategory: string;
  filteredWords: Word[];
  handleSearchChange: (newSearchTerm: string) => void;
  handleCategoryChange: (newCategory: string) => void;
}

const useWordFiltering = (wordsList: Word[]): FilteringHookResult => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearchChange = (newSearchTerm: string): void => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  const handleCategoryChange = (newCategory: string): void => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  const filteredWords = useMemo(() => {
    let filtered = wordsList;
    const search = debouncedSearchTerm.trim().toLowerCase();

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (word) => word.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter(
        (word) =>
          word.en.toLowerCase().includes(search) ||
          word.ua.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [wordsList, selectedCategory, debouncedSearchTerm]);

  return {
    searchTerm,
    selectedCategory,
    filteredWords,
    handleSearchChange,
    handleCategoryChange,
  };
};

export default useWordFiltering;
