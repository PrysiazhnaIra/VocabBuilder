import type { ChangeEvent } from "react";
import Icon from "../Icon/Icon";
import s from "./SearchInput.module.css";

interface SearchInputProps {
  searchItem: string;
  onSearchChange: (newSearchTerm: string) => void;
}

export default function SearchInput({
  searchItem,
  onSearchChange,
}: SearchInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
    console.log("Search text", event.target.value);
  };
  return (
    <div className={s.inputWrapper}>
      <input
        type="text"
        className={s.inputField}
        placeholder="Find the word"
        value={searchItem}
        onChange={handleChange}
      />

      <Icon
        name="icon-search"
        className={s.searchIcon}
        width={20}
        height={20}
      />
    </div>
  );
}
