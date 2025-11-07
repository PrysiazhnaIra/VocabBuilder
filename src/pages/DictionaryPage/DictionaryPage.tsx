import { useEffect, useMemo, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import WordsTable from "../../components/WordsTable/WordsTable";
import { useGetWordsQuery } from "../../redux/api/wordApi";
import s from "./DictionaryPage.module.css";
import useWordFiltering from "../../hooks/useWordFiltering";

export default function DictionaryPage() {
  const { data: allWords, isLoading, isError } = useGetWordsQuery(undefined);
  useEffect(() => {
    if (allWords) {
      console.log("allWords", allWords);
    }
    if (isError) {
      console.error("Error fetching words", isError);
    }
  }, [allWords, isError]);

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
        pageType="dictionary"
      />
      <WordsPagination totalPages={allWords?.totalPages || 1} />
    </div>
  );
}
