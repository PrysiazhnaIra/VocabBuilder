import Icon from "../Icon/Icon";
import s from "./LogoutBtn.module.css";
import { useLogoutMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
interface LogoutBtnProps {
  className?: string;
}

export default function LogoutBtn({ className, ...props }: LogoutBtnProps) {
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const buttonClasses = `${s.logOutBtn} ${className ? className : ""}`;

  const handleLogOut = async () => {
    try {
      await logoutUser({}).unwrap();

      console.log("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed, but clearing session locally:", error);
      navigate("/login");
    }
  };

  return (
    <button
      className={buttonClasses}
      onClick={handleLogOut}
      disabled={isLoading}
      type="button"
      {...props}
    >
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
