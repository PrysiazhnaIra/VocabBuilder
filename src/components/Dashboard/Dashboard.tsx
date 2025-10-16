import { useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useGetCategoriesQuery } from "../../redux/api/wordApi";
import { selectAuthStatus } from "../../redux/auth/authSelectors";

export default function Dashboard() {
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
    <div>
      <h2>Dashboard</h2>
      <select>
        {" "}
        <option value="">Select Category</option>
        {categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
