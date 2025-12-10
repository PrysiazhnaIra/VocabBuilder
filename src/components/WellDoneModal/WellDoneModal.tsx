import Button from "../Button/Button";
import ModalPortal from "../ModalPortal/ModalPortal";
import s from "./WellDoneModal.module.css";
import type { TrainingResult } from "../../types/types";

interface WellDoneModalProps {
  results: TrainingResult;
  onClose: () => void;
}

export default function WellDoneModal({
  results,
  onClose,
}: WellDoneModalProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <ModalPortal>
      <div
        className={s.overlay}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={s.closeButton} onClick={onClose}>
            &#10005;
          </button>

          <h2 className={s.title}>Well done</h2>

          <div className={s.resultsContainer}>
            <div className={s.resultsGrid}>
              <div className={s.column}>
                <h3 className={s.columnTitle}>Correct answers:</h3>
                <ul className={s.wordList}>
                  {Array.from({ length: results.correctAnswers }).map(
                    (_, index) => (
                      <li key={`correct-${index}`} className={s.wordItem}>
                        {/* Placeholder - in real app would show actual words */}
                        Word {index + 1}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className={s.column}>
                <h3 className={s.columnTitle}>Mistakes:</h3>
                <ul className={s.wordList}>
                  {Array.from({ length: results.mistakes }).map((_, index) => (
                    <li key={`mistake-${index}`} className={s.wordItem}>
                      {/* Placeholder - in real app would show actual words */}
                      Word {index + 1}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={s.illustration}>
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet="/images/book_tab_desk.png 1x, /images/book_tab_desk_2x.png 2x"
                />
                <img
                  src="/images/book_mob.png"
                  srcSet="/images/book_mob.png 1x, /images/book_mob_2x.png 2x"
                  alt="Book illustration"
                  className={s.bookImage}
                />
              </picture>
            </div>
          </div>

          <div className={s.buttonGroup}>
            <Button onClick={onClose} className={s.saveButton}>
              Save
            </Button>
            <Button onClick={onClose} className={s.cancelButton}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
