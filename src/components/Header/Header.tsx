import { useState } from "react";
import Icon from "../Icon/Icon";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import NavItem from "../NavItem/NavItem";
import s from "./Header.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Logo from "../Logo/Logo";

interface HeaderProp {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProp) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

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
                  <div className={s.userMenuWrapper}>
                    <p>Name</p>
                    <div className={s.userIconWrapper}>
                      <Icon
                        name="icon-user"
                        width={20}
                        height={20}
                        className={s.userIcon}
                      />
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
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
}
