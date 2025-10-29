import { Link } from "react-router-dom";
import s from "./Logo.module.css";
import Icon from "../Icon/Icon";

export default function Logo() {
  return (
    <Link to="/" className={s.logoWrapper}>
      <Icon name="icon-logo" className={s.logoIcon} />
      <span className={s.logoText}>VocabBuilder</span>
    </Link>
  );
}
