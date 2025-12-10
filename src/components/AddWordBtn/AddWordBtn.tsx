import { useState } from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import s from "./AddWordBtn.module.css";
import AddWordModal from "../AddWordModal/AddWordModal";

export default function AddWordBtn() {
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);

  return (
    <>
      <Button
        className={s.addWordBtn}
        onClick={() => setIsAddWordModalOpen(true)}
        type="button"
      >
        <div className={s.addWordBtnWrapper}>
          <p>Add word</p>
          <Icon name="icon-plus" className={s.icon} />
        </div>
      </Button>

      {isAddWordModalOpen && (
        <AddWordModal onClose={() => setIsAddWordModalOpen(false)} />
      )}
    </>
  );
}
