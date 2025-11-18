import { selectAuthStatus } from "../../redux/auth/authSelectors";
import { useGetCategoriesQuery } from "../../redux/api/wordApi";
import { useAppSelector } from "../../hooks/reduxHooks";
import s from "./CategoryFilter.module.css";
import Icon from "../Icon/Icon";
import { useEffect, useRef, useState } from "react";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (newCategory: string) => void;
}
export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const { isLoggedIn } = useAppSelector(selectAuthStatus);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategoriesQuery(undefined, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  const getDisplayName = (category: string) => {
    if (category === "all") return "Categories";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (!isLoggedIn) {
    return <div>Access Denied or Loading Authentication...</div>;
  }

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Failed to load categories. Please try again later.</div>;
  }
  return (
    <div className={s.categoryFilter} ref={dropdownRef}>
      <div
        className={s.categorySelect}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <span>{getDisplayName(selectedCategory)}</span>

        <Icon
          name="icon-arrow-down"
          width={20}
          height={20}
          className={`${s.iconDown} ${isOpen ? s.rotated : ""}`}
        />
      </div>

      {isOpen && (
        <ul className={s.customOptionList}>
          <li
            key="all"
            className={`${s.customOption} ${selectedCategory === "all" ? s.selected : ""}`}
            onClick={() => handleSelect("all")}
          >
            Categories
          </li>

          {categories?.map((category) => (
            <li
              key={category}
              className={`${s.customOption} ${selectedCategory === category ? s.selected : ""}`}
              onClick={() => handleSelect(category)}
            >
              {getDisplayName(category)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
