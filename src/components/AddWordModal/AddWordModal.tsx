import AddWordForm from "../AddWordForm/AddWordForm";
import Icon from "../Icon/Icon";
import ModalPortal from "../ModalPortal/ModalPortal";
import s from "./AddWordModal.module.css";

interface AddWordModalProps {
  onClose: () => void;
}
export default function AddWordModal({ onClose }: AddWordModalProps) {
  const handleClose = () => {
    onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <ModalPortal>
      <div
        className={s.overlay}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={s.closeButton} onClick={handleClose}>
            <Icon name="icon-close" className={s.iconClose} />
          </button>
          <div className={s.formWrapper}>
            <h2 className={s.title}>Add word</h2>
            <p className={s.description}>
              Adding a new word to the dictionary is an important step in
              enriching the language base and expanding the vocabulary.
            </p>
            <AddWordForm onClose={onClose} />
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
