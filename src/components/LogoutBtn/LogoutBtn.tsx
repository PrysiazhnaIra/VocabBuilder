import Icon from "../Icon/Icon";
import s from "./LogoutBtn.module.css";

interface LogoutBtnProps {
  className?: string;
}

export default function LogoutBtn({ className, ...props }: LogoutBtnProps) {
  const buttonClasses = `${s.logOutBtn} ${className ? className : ""}`;

  const handleLogOut = () => {
    console.log("Log out");
  };
  return (
    <button className={buttonClasses} onClick={handleLogOut}>
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
