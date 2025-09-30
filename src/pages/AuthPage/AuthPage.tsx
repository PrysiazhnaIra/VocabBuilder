import { Outlet, useLocation } from "react-router-dom";

export default function AuthPage() {
  const location = useLocation();
  const isRegister = location.pathname.includes("/register");
  const title = isRegister ? "Register" : "Login";
  const description = isRegister
    ? "To start using our services, please fill out the registration form below. All fields are mandatory:"
    : "Please enter your login details to continue using our service:";

  return (
    <div>
      <div>IMAGE - People</div>
      <section>
        <h2>{title}</h2>
        <p>{description}</p>

        <Outlet />
      </section>
    </div>
  );
}
