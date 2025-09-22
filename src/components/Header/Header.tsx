import Icon from "../Icon/Icon";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.logoWrapper}>
        <Icon name="icon-logo" width={40} height={40} className={s.icon} />
        <h1 className={s.logoText}>VocabBuilder</h1>
      </div>
    </header>
  );
}
