import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import s from "./NotFoundPage.module.css";
export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={s.block}>
      <h2 className={s.title}>Page not found</h2>
      <Button
        type="button"
        onClick={() => navigate("/dictionary")}
        className={s.btn}
      >
        GoBack
      </Button>
    </div>
  );
}
