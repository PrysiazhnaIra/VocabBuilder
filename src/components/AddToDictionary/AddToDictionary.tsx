import type { Word } from "../../types/types";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import s from "./AddToDictionary.module.css";

export default function AddToDictionary({ wordData }: { wordData: Word }) {
  console.log("wordDataForBack", wordData);
  return (
    <Button className={s.wrapper}>
      <p className={s.text}>Add to dictionary</p>
      <Icon name="icon-arrow-right" className={s.icon} />
    </Button>
  );
}
