import Dashboard from "../../components/Dashboard/Dashboard";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import WordsTable from "../../components/WordsTable/WordsTable";

export default function DictionaryPage() {
  return (
    <>
      <Dashboard />
      <WordsTable />
      <WordsPagination />
    </>
  );
}
