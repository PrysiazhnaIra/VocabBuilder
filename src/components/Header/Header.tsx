import { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import NavItem from "../NavItem/NavItem";
import s from "./Header.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface HeaderProp {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProp) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setIsSidebarOpen(false);
    }
  }, [isLoggedIn]);

  const openUserProfile = () => {
    navigate("/profile");
  }

  return (
    <>
      {isLoggedIn ? (
        <header>
          <nav className={s.header}>
            <Logo />
            {isLoggedIn && (
              <>
                <ul className={s.navLinks}>
                  <NavItem to="/dictionary" text="Dictionary" />
                  <NavItem to="/recommend" text="Recommend" />
                  <NavItem to="/training" text="Training" />
                </ul>

                <div className={s.rightSide}>
                  <div className={s.userMenuWrapper} >
                    <div className={s.userWrapper} onClick={openUserProfile}>
                    <p>{user.name || "User"}</p>
                    <div className={s.userIconWrapper}>
                      <Icon
                        name="icon-user"
                        width={20}
                        height={20}
                        className={s.userIcon}
                      />
                      </div>
                    </div>
                    <button className={s.navToggle} onClick={toggleSidebar}>
                      <Icon
                        name="icon-Nav"
                        width={32}
                        height={32}
                        className={s.navIcon}
                      />
                    </button>
                  </div>
                  <LogoutBtn className={s.logOutBtn} />
                </div>
              </>
            )}
          </nav>
        </header>
      ) : (
        <div className={s.logo}>
          <Logo />
        </div>
      )}
      {isLoggedIn && <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />}
    </>
  );
}
