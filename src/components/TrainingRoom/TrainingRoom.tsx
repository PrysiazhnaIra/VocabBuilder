import { useState } from "react";
import Button from "../Button/Button";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import s from "./TrainingRoom.module.css";
import Icon from "../Icon/Icon";
import { useNavigate } from "react-router-dom";

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
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (onNext) {
      onNext(translation);
      setTranslation("");
    }
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmSave = () => {
    onSave(translation);
    setTranslation("");
    navigate("/recommend");
  };

  const handleConfirmCancel = () => {
    setTranslation("");
    navigate("/recommend");
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
        <Button onClick={handleSaveClick} className={s.saveButton} type="button">
          Save
        </Button>
        <Button onClick={handleCancelClick} className={s.cancelButton} type="button">
          Cancel
        </Button>
      </div>

      {showSaveModal && (
        <ConfirmModal
          onClose={() => setShowSaveModal(false)}
          onConfirm={handleConfirmSave}
          title="Save answers?"
          message="Are you sure you want to save all your answers? This action will submit your training results."
          confirmText="Save"
          cancelText="Cancel"
        />
      )}

      {showCancelModal && (
        <ConfirmModal
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancel}
          title="Cancel training?"
          message="Are you sure you want to cancel? All your progress will be lost and you will be redirected to the recommend page."
          confirmText="Yes, cancel"
          cancelText="No, continue"
        />
      )}
    </div>
  );
}


