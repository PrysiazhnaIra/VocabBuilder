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
    } catch (error) {
      toast.error("Failed to add word.");
    }
  };

  return (
    <Button className={s.wrapper} onClick={handleAdd} disabled={isLoading}>
      <p className={s.text}>{isLoading ? "Adding..." : "Add to dictionary"}</p>
      <Icon name="icon-arrow-right" className={s.icon} />
    </Button>
  );
}
