import { useState } from "react";
import Button from "../Button/Button";
import s from "./TrainingRoom.module.css";
import Icon from "../Icon/Icon";

interface TrainingRoomProps {
  word: string;
  onNext?: (translation: string) => void;
  onSave: (translation: string) => void;
  isLastTask: boolean;
}

export default function TrainingRoom({
  word,
  onNext,
  onSave,
}: TrainingRoomProps) {
  const [translation, setTranslation] = useState("");

  const handleNext = () => {
    if (onNext) {
      onNext(translation);
      setTranslation("");
    }
  };

  const handleSave = () => {
    onSave(translation);
    setTranslation("");
  };

  return (
    <div className={s.container}>
      <div className={s.inputSection}>
        <input
          id="translation"
          type="text"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          className={s.input}
          placeholder="Введіть переклад"
          autoFocus
        />
        
        <div className={s.inputControls}>
            <button onClick={handleNext} className={s.nextButton} type="button">
              Next
              <span className={s.arrow}>→</span>
            </button>
           <div className={s.languageIndicator}>
            <Icon name="icon-ukraine" className={s.icon} />
            <span className={s.language}>Ukrainian</span>
          </div>
        </div>
      </div>

      <div className={s.wordSection}>
        <div className={s.wordCard}>
          <p className={s.word}>{word}</p>
          <div className={s.languageIndicator}>
            <Icon name="icon-united-kingdom" className={s.icon} />
            <span className={s.language}>English</span>
          </div>
        </div>
      </div>

      <div className={s.buttonGroup}>
        <Button onClick={handleSave} className={s.saveButton} type="button">
          Save
        </Button>
        <Button onClick={() => setTranslation("")} className={s.cancelButton}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
