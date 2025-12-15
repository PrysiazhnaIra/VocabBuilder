import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import WordsTable from "../../components/WordsTable/WordsTable";
import AddWordModal from "../../components/AddWordModal/AddWordModal";
import { useGetOwnWordsQuery } from "../../redux/api/wordApi";
import s from "./DictionaryPage.module.css";
import useWordFiltering from "../../hooks/useWordFiltering";
import { toast } from "react-toastify";

const WORDS_PER_PAGE = 7;

export default function DictionaryPage() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    searchTerm,
    selectedCategory,
    debouncedSearchTerm,
    handleSearchChange,
    handleCategoryChange,
  } = useWordFiltering();

  // Open AddWordModal if navigated from TrainingPage
  useEffect(() => {
    if (location.state?.openAddModal) {
      setIsAddModalOpen(true);
    }
  }, [location.state]);

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      limit: WORDS_PER_PAGE,
      keyword: debouncedSearchTerm || undefined,
      category: selectedCategory === "all" ? undefined : selectedCategory,
    }),
    [currentPage, debouncedSearchTerm, selectedCategory]
  );

  const { data: allWords, isLoading, isError } = useGetOwnWordsQuery(queryParams);

  useEffect(() => {
    if (allWords) {
      toast.success("Words fetched successfully!");
    }
    if (isError) {
      toast.error("Error fetching words");
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
      {isAddModalOpen && (
        <AddWordModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}
