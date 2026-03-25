import { useAuth } from "../../hooks/useAuth";
import s from "./ProfilePage.module.css";
import { User, Mail, Calendar, Edit3, Settings, Camera } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  const avatarUrl = (user as any).avatar || "/images/default-avatar.png";

  return (
    <div className={s.wrapper}>
      <div className={s.profileCard}>
        <div className={s.cover}>
          <button className={s.editCoverBtn} title="Change Cover">
            <Camera size={18} />
          </button>
        </div>

        <div className={s.profileHeader}>
          <div className={s.avatarWrapper}>
            <img src={avatarUrl} alt="User avatar" className={s.avatar} />
            <button className={s.editAvatarBtn} title="Change Avatar">
              <Camera size={16} />
            </button>
          </div>
          <div className={s.headerText}>
            <h2 className={s.title}>{user?.name || "Member"}</h2>
            <p className={s.subtitle}>Vocab Builder Enthusiast</p>
          </div>
        </div>

        <div className={s.profileContent}>
          <div className={s.infoSection}>
            <h3 className={s.sectionTitle}>Personal Information</h3>
            <div className={s.infoList}>
              <div className={s.infoItem}>
                <div className={s.iconWrapper}>
                  <User size={20} />
                </div>
                <div className={s.infoText}>
                  <span className={s.label}>Full Name</span>
                  <span className={s.value}>
                    {user?.name || "Not provided"}
                  </span>
                </div>
              </div>

              <div className={s.infoItem}>
                <div className={s.iconWrapper}>
                  <Mail size={20} />
                </div>
                <div className={s.infoText}>
                  <span className={s.label}>Email Address</span>
                  <span className={s.value}>
                    {user?.email || "Not provided"}
                  </span>
                </div>
              </div>

              <div className={s.infoItem}>
                <div className={s.iconWrapper}>
                  <Calendar size={20} />
                </div>
                <div className={s.infoText}>
                  <span className={s.label}>Member Since</span>
                  <span className={s.value}>{new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={s.actionsSection}>
            <button className={s.actionBtn}>
              <Edit3 size={18} />
              <span>Edit Profile</span>
            </button>
            <button className={`${s.actionBtn} ${s.secondaryBtn}`}>
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
