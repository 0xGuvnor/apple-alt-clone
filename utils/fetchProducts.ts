import axios from "axios";

export const fetchProducts = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getProducts`
  );

  const data = res.data;
  const products: Product[] = data.products;

  return products;
};
