import { useEffect, useMemo, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import WordsTable from "../../components/WordsTable/WordsTable";
import useDebounce from "../../hooks/useDebounce";
import { useGetWordsQuery } from "../../redux/api/wordApi";
import s from "./DictionaryPage.module.css";

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

  useMemo(() => {
    return debouncedSearchTerm.trim();
  }, [debouncedSearchTerm]);

  const handleSearchChange = (newSearchTerm: string): void => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  const handleCategoryChange = (newCategory: string): void => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  const wordsList = allWords?.results || [];

  return (
    <div className={s.container}>
      <Dashboard
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <WordsTable
        words={wordsList}
        isLoading={isLoading}
        pageType="dictionary"
      />
      <WordsPagination totalPages={allWords?.totalPages || 1} />
    </div>
  );
}
