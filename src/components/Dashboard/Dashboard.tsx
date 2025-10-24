import s from "./Dashboard.module.css";
import Filters from "../Filters/Filters";
import Statistics from "../Statistics/Statistics";
import AddWordBtn from "../AddWordBtn/AddWordBtn";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className={s.dashboardWrap}>
      <Filters />
      <Statistics />
      <AddWordBtn />
      <Link to="/training">Train oneself</Link>
    </div>
  );
}
