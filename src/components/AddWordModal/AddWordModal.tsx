import AddWordForm from "../AddWordForm/AddWordForm";
import BaseModal from "../BaseModal/BaseModal";
import s from "./AddWordModal.module.css";

interface AddWordModalProps {
  onClose: () => void;
}

export default function AddWordModal({ onClose }: AddWordModalProps) {
  return (
    <BaseModal onClose={onClose}>
      <div className={s.formWrapper}>
        <h2 className={s.title}>Add word</h2>
        <p className={s.description}>
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>
        <AddWordForm onClose={onClose} />
      </div>
    </BaseModal>
  );
}
