import { useAuth } from "../../hooks/useAuth";
import s from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { user } = useAuth();
  
  const avatarUrl = (user as any).avatar || "/images/default-avatar.png";

  return (
    <div className={s.wrapper}>
      <div className={s.profileHeader}>
        <img 
          src={avatarUrl} 
          alt="User avatar" 
          className={s.avatar}
        />
        <h2 className={s.title}>Welcome!</h2>
      </div>
      <div className={s.userInfo}>
        <div className={s.infoItem}>
          <span className={s.label}>Name:</span>
          <span className={s.value}>{user.name || "Not provided"}</span>
        </div>
        <div className={s.infoItem}>
          <span className={s.label}>Email:</span>
          <span className={s.value}>{user.email || "Not provided"}</span>
        </div>
      </div>
    </div>
  );
}