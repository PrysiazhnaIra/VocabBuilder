import type { Word } from "../../types/types";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import s from "./AddToDictionary.module.css";

import { useAddWordFromIdMutation } from "../../redux/api/wordApi";
import { toast } from "react-toastify";

export default function AddToDictionary({ wordData }: { wordData: Word }) {
  const [addWordFromId, { isLoading }] = useAddWordFromIdMutation();

  const handleAdd = async () => {
    if (!wordData._id) return;
    try {
      await addWordFromId(wordData._id).unwrap();
      toast.success("Word added to dictionary!");
    } catch (error: any) {
      // Assuming a 409 or 400 status for duplicate, or just generic handling
      // If the backend returns a message, we could use it, but user requested specific text.
      // We'll use the user's text for now as a catch-all for "failed to add" which usually implies duplicate in this context.
      const errorMessage = error?.data?.message || "Failed to add word";
      
      if (errorMessage.includes("exists") || errorMessage.includes("duplicate") || error.status === 409 || error.status === 400) {
         toast.warning("This word is already in your dictionary. Choose another word for practice");
      } else {
         toast.error("Failed to add word.");
      }
    }
  };

  return (
    <Button className={s.wrapper} onClick={handleAdd} disabled={isLoading}>
      <p className={s.text}>{isLoading ? "Adding..." : "Add to dictionary"}</p>
      <Icon name="icon-arrow-right" className={s.icon} />
    </Button>
  );
}
