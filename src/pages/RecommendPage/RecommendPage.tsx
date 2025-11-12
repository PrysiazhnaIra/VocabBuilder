import { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsTable from "../../components/WordsTable/WordsTable";
import s from "./RecommendPage.module.css";
import { useGetWordsQuery } from "../../redux/api/wordApi";
import useWordFiltering from "../../hooks/useWordFiltering";
import WordsPagination from "../../components/WordsPagination/WordsPagination";

export default function RecommendPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: allWords, isLoading, isError } = useGetWordsQuery({
    page: currentPage,
  });
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

  const wordsList = allWords?.results || [];

  const {
    searchTerm,
    selectedCategory,
    filteredWords,
    handleSearchChange,
    handleCategoryChange,
  } = useWordFiltering(wordsList);

  return (
    <div className={s.container}>
      <Dashboard
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <WordsTable
        words={filteredWords}
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
