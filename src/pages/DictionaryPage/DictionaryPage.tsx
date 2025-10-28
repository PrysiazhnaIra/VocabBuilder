import { useEffect, useMemo, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import WordsTable from "../../components/WordsTable/WordsTable";
import useDebounce from "../../hooks/useDebounce";
import { useGetWordsQuery } from "../../redux/api/wordApi";

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 10;

  const { data: allWords, isLoading, isError } = useGetWordsQuery(undefined);
  useEffect(() => {
    if (allWords) {
      console.log("allWords", allWords);
    }
    if (isError) {
      console.error("Error fetching words", isError);
    }
  }, [allWords, isError]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const trimmedSearchTerm = useMemo(() => {
    return debouncedSearchTerm.trim();
  }, [debouncedSearchTerm]);

  console.log("Trimmed Search Term:", trimmedSearchTerm);

  const handleSearchChange = (newSearchTerm: string): void => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  const handleCategoryChange = (newCategory: string): void => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  return (
    <>
      <Dashboard
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {/* <WordsTable /> */}
      {isLoading && <div>Завантаження слів...</div>}
      {isError && <div>Помилка завантаження!</div>}
      <WordsPagination />
    </>
  );
}
