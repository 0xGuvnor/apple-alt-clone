import axios from "axios";

export const fetchCategories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCategories`
  );

  const data = res.data;
  const categories: Category[] = data.categories;

  return categories;
};
