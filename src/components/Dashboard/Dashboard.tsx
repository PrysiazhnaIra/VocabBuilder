import s from "./Dashboard.module.css";
import Filters from "../Filters/Filters";
import Statistics from "../Statistics/Statistics";
import AddWordBtn from "../AddWordBtn/AddWordBtn";
import { Link } from "react-router-dom";

interface DashboardProps {
  searchTerm: string;
  onSearchChange: (newSearchTerm: string) => void;
  selectedCategory: string;
  onCategoryChange: (newCategory: string) => void;
}
export default function Dashboard({
  onSearchChange,
  searchTerm,
  selectedCategory,
  onCategoryChange,
}: DashboardProps) {
  return (
    <div className={s.dashboardWrap}>
      <Filters
        onSearchChange={onSearchChange}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      <Statistics />
      <AddWordBtn />
      <Link to="/training">Train oneself</Link>
    </div>
  );
}
