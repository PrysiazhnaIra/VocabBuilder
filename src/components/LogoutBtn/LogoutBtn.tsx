import Icon from "../Icon/Icon";
import s from "./LogoutBtn.module.css";
import { useLogoutMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { clearAuthState } from "../../redux/auth/authSlice";
interface LogoutBtnProps {
  className?: string;
}

export default function LogoutBtn({ className, ...props }: LogoutBtnProps) {
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const buttonClasses = `${s.logOutBtn} ${className ? className : ""}`;

  const handleLogOut = async () => {
    try {
      await logoutUser({}).unwrap();

      dispatch(clearAuthState());
      toast.success("You have been logged out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout failed, but clearing session locally:", error);
      dispatch(clearAuthState());
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
