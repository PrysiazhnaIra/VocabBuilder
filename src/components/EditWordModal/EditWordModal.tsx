import { useState } from "react";
import { useUpdateWordMutation } from "../../redux/api/wordApi";
import type { UpdateWordBody, Word } from "../../types/types";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import ModalPortal from "../ModalPortal/ModalPortal";
import s from "./EditWordModal.module.css";
import { toast } from "react-toastify";
interface EditWordModalProps {
  wordToEdit: Word;
  onClose: () => void;
}

export default function EditWordModal({
  wordToEdit,
  onClose,
}: EditWordModalProps) {
  const [changedWord, setChangedWord] = useState<Word>();
  const [updateWord, { isLoading, isError }] = useUpdateWordMutation();
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving changes for word:", wordToEdit);

    if (!wordToEdit._id) return;
    if (!changedWord) return;
    if (isError) {
      console.log("error", isError);
    }

    const dataToUpdate: UpdateWordBody = {
      en: changedWord.en,
      ua: changedWord.ua,
      category: wordToEdit.category,
    };

    const res = await updateWord({
      wordId: wordToEdit._id,
      editedBody: dataToUpdate,
    });
    console.log("Update response:", res);
    if ("error" in res) {
      const err: any = res.error;
      const message =
        (err &&
          typeof err === "object" &&
          (err.data?.message ?? err.message)) ??
        "";
      toast.error(`Error updating the word. ${message}`);
      return;
    }
    toast.success("Word updated successfully!");
    onClose();
  };

  const handleClose = () => {
    onClose();
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

          <form onSubmit={handleSubmit} className={s.form}>
            <label className={s.label}>
              <div className={s.labelHeader}>
                <Icon name="icon-ukraine" className={s.inputIcon} />
                <p className={s.labelText}>Ukrainian</p>
              </div>
              <input
                type="text"
                defaultValue={
                  wordToEdit?.ua
                    ? wordToEdit.ua.charAt(0).toUpperCase() +
                      wordToEdit.ua.slice(1)
                    : ""
                }
                onChange={(e) =>
                  setChangedWord({ ...wordToEdit, ua: e.target.value })
                }
                className={s.input}
                required
              />
            </label>

            <label className={s.label}>
              <div className={s.labelHeader}>
                <Icon name="icon-united-kingdom" className={s.inputIcon} />
                <p className={s.labelText}>English</p>
              </div>
              <input
                type="text"
                defaultValue={
                  wordToEdit?.en
                    ? wordToEdit.en.charAt(0).toUpperCase() +
                      wordToEdit.en.slice(1)
                    : ""
                }
                onChange={(e) =>
                  setChangedWord({ ...wordToEdit, en: e.target.value })
                }
                className={s.input}
                required
              />
            </label>

            <div className={s.btnWrapper}>
              <Button type="submit" className={s.saveButton}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                className={s.cancelButton}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
