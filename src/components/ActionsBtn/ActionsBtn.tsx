import { useEffect, useRef, useState } from "react";
import { useDeleteWordMutation } from "../../redux/api/wordApi";
import s from "./ActionsBtn.module.css";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import EditWordModal from "../EditWordModal/EditWordModal";
import type { Word } from "../../types/types";

export default function ActionsBtn({ wordData }: { wordData: Word }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [deleteWord, { isLoading: isDeleting }] = useDeleteWordMutation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const wordId = wordData._id;

  const handleDelete = async () => {
    if (isDeleting) return;
    if (!wordId) return;

    try {
      await deleteWord(wordId).unwrap();

      setIsModalOpen(false);

      console.log(`Word with ID ${wordId} deleted successfully.`);
    } catch (error) {
      setIsModalOpen(false);

      type ApiError =
        | { status?: number; data?: { message?: string } }
        | undefined;
      const err = error as ApiError;
      const status = err?.status;
      const message = err?.data?.message ?? "Unknown error occurred.";

      console.error("Failed to delete the word:", error);

      if (status === 404) {
        console.log(
          "Something went wrong. The word could be deleted earlier. "
        );
      } else {
        console.log(` Error deleting: ${message}`);
      }
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={s.wrapper} ref={dropdownRef}>
      <Button
        className={s.dotsButton}
        onClick={() => setIsModalOpen(!isModalOpen)}
        disabled={isDeleting}
      >
        <Icon name="icon-dots" width={12} height={22} />
      </Button>

      {isModalOpen && (
        <div className={s.dropdownMenu}>
          <Button className={s.menuItem} onClick={handleEdit}>
            <Icon name="icon-paint" width={16} height={16} className={s.icon} />
            <p>Edit</p>
          </Button>

          <Button
            className={s.menuItem}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Icon name="icon-trash" width={16} height={16} className={s.icon} />
            <p> {isDeleting ? "Deleting..." : "Delete"}</p>
          </Button>
        </div>
      )}

      {isEditModalOpen && (
        <EditWordModal
          wordToEdit={wordData}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
