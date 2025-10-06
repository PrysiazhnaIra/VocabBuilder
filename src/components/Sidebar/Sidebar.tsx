import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon";
import s from "./Sidebar.module.css";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarClasses = `${s.sidebar} ${isOpen ? s.open : ""}`;

  const userName = "Iryna";

  return (
    <>
      {isOpen && <div className={s.overlay} onClick={onClose} />}

      <aside className={sidebarClasses}>
        <div className={s.header}>
          <div className={s.userInfo}>
            <span className={s.name}>{userName}</span>
            <span className={s.userIconWrapper}>
              <Icon name="icon-user" className={s.userIcon} />
            </span>
          </div>
          <button className={s.closeBtn} onClick={onClose}>
            &#10005;
          </button>
        </div>

        <nav className={s.nav}>
          <ul className={s.navList}>
            <li className={s.navItem}>
              <NavLink
                to="/dictionary"
                className={({ isActive }) =>
                  isActive ? s.activeLink : s.navLink
                }
                onClick={onClose}
              >
                Dictionary
              </NavLink>
            </li>
            <li className={s.navItem}>
              <NavLink
                to="/recommend"
                className={({ isActive }) =>
                  isActive ? s.activeLink : s.navLink
                }
                onClick={onClose}
              >
                Recommend
              </NavLink>
            </li>
            <li className={s.navItem}>
              <NavLink
                to="/training"
                className={({ isActive }) =>
                  isActive ? s.activeLink : s.navLink
                }
                onClick={onClose}
              >
                Training
              </NavLink>
            </li>
            <li className={s.navItem}>
              <LogoutBtn className={s.logOutBtn} />
            </li>
          </ul>
        </nav>

        <img
          src="/images/people_mob_mod.png"
          alt="A man and a woman sitting and reading a book, symbolizing learning."
          className={s.image}
        />
      </aside>
    </>
  );
}
