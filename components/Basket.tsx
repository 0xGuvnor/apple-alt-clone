import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../redux/basketSlice";

const Basket = () => {
  const itemsInBasket = useSelector(selectBasketItems);

  if (itemsInBasket.length === 0) return null;

  return (
    <Link href="/checkout">
      <div className="fixed z-50 flex items-center justify-center w-16 h-16 rounded-full cursor-pointer backdrop-blur-sm bg-gray-300/80 group bottom-10 right-10">
        {itemsInBasket && (
          <span className="absolute z-50 flex items-center justify-center text-xs text-white rounded-full -right-1 -top-1 h-7 w-7 bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500">
            {itemsInBasket.length}
          </span>
        )}
        <ShoppingBagIcon className="w-8 h-8 headerIcon group-hover:opacity-100" />
      </div>
    </Link>
  );
};
export default Basket;
