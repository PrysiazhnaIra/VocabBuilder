import { useEffect, useMemo, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsTable from "../../components/WordsTable/WordsTable";
import s from "./RecommendPage.module.css";
import { useGetWordsQuery } from "../../redux/api/wordApi";
import useWordFiltering from "../../hooks/useWordFiltering";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import { toast } from "react-toastify";

const WORDS_PER_PAGE = 7;

export default function RecommendPage() {
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
      limit: WORDS_PER_PAGE,
      keyword: debouncedSearchTerm || undefined,
      category: selectedCategory === "all" ? undefined : selectedCategory,
    }),
    [currentPage, debouncedSearchTerm, selectedCategory]
  );

  const { data: allWords, isLoading, isError } = useGetWordsQuery(queryParams);

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching words");
    }
  }, [isError]);

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
        pageType="recommend"
      />
      <WordsPagination
        totalPages={allWords?.totalPages || 1}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
