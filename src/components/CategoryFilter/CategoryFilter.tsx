import { useEffect, useState } from "react";

import { selectAuthStatus } from "../../redux/auth/authSelectors";
import { useGetCategoriesQuery } from "../../redux/api/wordApi";
import { useAppSelector } from "../../hooks/reduxHooks";
import s from "./CategoryFilter.module.css";
import Icon from "../Icon/Icon";

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Categories");
  const { isLoggedIn } = useAppSelector(selectAuthStatus);

  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategoriesQuery(undefined, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    console.log("Categories data:", categories);
  }, [categories]);

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
    <div className={s.categoryFilter}>
      <select
        name="category"
        className={s.categorySelect}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories?.map((category) => (
          <option key={category} value={category} className={s.categoryOption}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      <Icon
        name="icon-arrow-down"
        width={20}
        height={20}
        className={s.iconDown}
      />
    </div>
  );
}
