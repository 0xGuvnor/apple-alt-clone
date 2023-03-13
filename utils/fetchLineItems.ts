import axios from "axios";

export const fetchLineItems = async (sessionId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSession?session_id=${sessionId}`
  );

  const data = res.data;
  const products = data.session.data;

  return products;
};
