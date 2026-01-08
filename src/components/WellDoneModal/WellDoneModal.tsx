import Button from "../Button/Button";
import BaseModal from "../BaseModal/BaseModal";
import s from "./WellDoneModal.module.css";

interface WellDoneModalProps {
  correctWords: string[];
  incorrectWords: string[];
  onClose: () => void;
  onSave: () => void;
}

export default function WellDoneModal({
  correctWords,
  incorrectWords,
  onClose,
  onSave,
}: WellDoneModalProps) {
  return (
    <BaseModal onClose={onClose}>
      <h2 className={s.title}>Well done</h2>

      <div className={s.contentWrapper}>
        <div className={s.resultsContainer}>
          <div className={s.column}>
            <h3 className={s.columnTitle}>Correct answers:</h3>
            <ul className={s.wordList}>
              {correctWords.map((word, index) => (
                <li key={`correct-${index}`} className={s.wordItem}>
                  {word}
                </li>
              ))}
            </ul>
          </div>

          <div className={s.column}>
            <h3 className={s.columnTitle}>Mistakes:</h3>
            <ul className={s.wordList}>
              {incorrectWords.map((word, index) => (
                <li key={`mistake-${index}`} className={s.wordItem}>
                  {word}
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
        <Button onClick={onSave} className={s.saveButton}>
          Save
        </Button>
        <Button onClick={onClose} className={s.cancelButton}>
          Cancel
        </Button>
      </div>
    </BaseModal>
  );
}

