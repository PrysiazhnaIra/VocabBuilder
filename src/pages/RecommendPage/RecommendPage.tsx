import WordsTable from "../../components/WordsTable/WordsTable";
import type { Word } from "../../types/types";

const wordsList: Word[] = [
  {
    _id: "1",
    en: "example",
    ua: "приклад",
    category: "general",
  },
  {
    _id: "2",
    en: "test",
    ua: "тест",
    category: "general",
  },
  {
    _id: "3",
    en: "word",
    ua: "слово",
    category: "general",
  },
];

const isLoading = false;
export default function RecommendPage() {
  return (
    <>
      <WordsTable
        words={wordsList}
        isLoading={isLoading}
        pageType="recommend"
      />
    </>
  );
}
