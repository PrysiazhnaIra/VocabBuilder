import { NavLink } from "react-router-dom";
import s from "./NavItem.module.css";

interface NavItemProps {
  to: string;
  text: string;
}

export default function NavItem({ to, text }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? s.activeLink : s.navLink)}
    >
      {text}
    </NavLink>
  );
}
