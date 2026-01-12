import BaseModal from "../BaseModal/BaseModal";
import Button from "../Button/Button";
import s from "./ConfirmModal.module.css";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal onClose={onClose}>
      <div className={s.content}>
        <h2 className={s.title}>{title}</h2>
        <p className={s.message}>{message}</p>

        <div className={s.buttonGroup}>
          <Button onClick={handleConfirm} className={s.confirmButton}>
            {confirmText}
          </Button>
          <Button onClick={onClose} className={s.cancelButton}>
            {cancelText}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
