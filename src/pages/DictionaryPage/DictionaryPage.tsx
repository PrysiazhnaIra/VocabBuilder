import { useEffect, useMemo, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import WordsTable from "../../components/WordsTable/WordsTable";
import { useGetWordsQuery } from "../../redux/api/wordApi";
import s from "./DictionaryPage.module.css";
import useWordFiltering from "../../hooks/useWordFiltering";

export default function DictionaryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    searchTerm,
    selectedCategory,
    debouncedSearchTerm,
    handleSearchChange,
    handleCategoryChange,
  } = useWordFiltering();

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      keyword: debouncedSearchTerm || undefined,
      category: selectedCategory === "all" ? undefined : selectedCategory,
    }),
    [currentPage, debouncedSearchTerm, selectedCategory]
  );

  const { data: allWords, isLoading, isError } = useGetWordsQuery(queryParams);

  useEffect(() => {
    if (allWords) {
      console.log("allWords", allWords);
    }
    if (isError) {
      console.error("Error fetching words", isError);
    }
  }, [allWords, isError]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (allWords?.totalPages || 1)) {
      setCurrentPage(newPage);
    }
  };

  const handleDashboardSearchChange = (value: string) => {
    handleSearchChange(value);
    setCurrentPage(1);
  };

  const handleDashboardCategoryChange = (value: string) => {
    handleCategoryChange(value);
    setCurrentPage(1);
  };

  return (
    <div className={s.container}>
      <Dashboard
        onSearchChange={handleDashboardSearchChange}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={handleDashboardCategoryChange}
      />
      <WordsTable
        words={allWords?.results || []}
        isLoading={isLoading}
        pageType="dictionary"
      />
      <WordsPagination
        totalPages={allWords?.totalPages || 1}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
