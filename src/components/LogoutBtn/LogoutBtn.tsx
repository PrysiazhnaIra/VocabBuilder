import Icon from "../Icon/Icon";
import s from "./LogoutBtn.module.css";

export default function LogoutBtn() {
  const handleLogOut = () => {
    console.log("Log out");
  };
  return (
    <button className={s.logOutBtn} onClick={handleLogOut}>
      <span className={s.logOutText}>Log out</span>
      <Icon
        name="icon-arrow-right"
        width={16}
        height={16}
        className={s.logOutIcon}
      />
    </button>
  );
}
