import { Outlet, useLocation } from "react-router-dom";
import Illustration from "../../components/Illustration/Illustration";
import s from "./AuthPage.module.css";
import InfoRow from "../../components/InfoRow/InfoRow";

export default function AuthPage() {
  const location = useLocation();
  const isRegister = location.pathname.includes("/register");
  const title = isRegister ? "Register" : "Login";
  const description = isRegister
    ? "To start using our services, please fill out the registration form below. All fields are mandatory:"
    : "Please enter your login details to continue using our service:";

  return (
    <div
      className={`${s.wrapper} ${isRegister ? s.registerRoute : s.loginRoute}`}
    >
      <div>
        <Illustration />
        <div className={s.infoRowContainer}>
          <InfoRow />
        </div>
      </div>
      <section className={s.formWrap}>
        <h2 className={s.title}>{title}</h2>
        <p className={s.description}>{description}</p>
        <Outlet />
      </section>
    </div>
  );
}
