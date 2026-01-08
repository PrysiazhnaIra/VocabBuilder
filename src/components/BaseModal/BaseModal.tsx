import type { ReactNode } from "react";
import Icon from "../Icon/Icon";
import ModalPortal from "../ModalPortal/ModalPortal";
import s from "./BaseModal.module.css";

interface BaseModalProps {
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function BaseModal({
  onClose,
  children,
  className = "",
}: BaseModalProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <ModalPortal>
      <div
        className={s.overlay}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div
          className={`${s.modalContent} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={s.closeButton} onClick={onClose}>
            <Icon name="icon-close" className={s.iconClose} />
          </button>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
