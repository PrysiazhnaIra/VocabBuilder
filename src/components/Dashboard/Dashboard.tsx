import s from "./Dashboard.module.css";
import Filters from "../Filters/Filters";
import Statistics from "../Statistics/Statistics";
import AddWordBtn from "../AddWordBtn/AddWordBtn";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";

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
      <div className={s.statisticActionsRow}>
        <Statistics />
        <div className={s.actionsWrapper}>
          <AddWordBtn />
          <Link to="/training" className={s.trainLink}>
            <p>Train oneself</p>{" "}
            <Icon name="icon-arrow-right" className={s.arrowIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
}
