import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import s from "./AddWordBtn.module.css";

export default function AddWordBtn() {
  return (
    <Button className={s.addWordBtn}>
      <div className={s.addWordBtnWrapper}>
        <p>Add word</p>
        <Icon name="icon-plus" className={s.icon} />
      </div>
    </Button>
  );
}
