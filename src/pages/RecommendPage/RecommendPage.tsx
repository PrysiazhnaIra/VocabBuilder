import { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsTable from "../../components/WordsTable/WordsTable";
import s from "./RecommendPage.module.css";
import { useGetWordsQuery } from "../../redux/api/wordApi";
import useWordFiltering from "../../hooks/useWordFiltering";

export default function RecommendPage() {
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
        pageType="recommend"
      />
    </div>
  );
}
