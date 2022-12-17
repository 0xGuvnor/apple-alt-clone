import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { categoryId } from "../constants/productCategory";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../redux/basketSlice";
import { toast } from "react-hot-toast";

interface Props {
  items: Product[];
  id: string;
}

const CheckoutProduct = ({ items, id }: Props) => {
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} has been removed.`, {
      position: "bottom-center",
    });
  };

  return (
    <div
      className={`flex flex-col py-4 border-b border-gray-300 gap-x-4 lg:flex-row lg:items-center px-5 md:px-8 first:rounded-t-xl last:rounded-b-xl ${
        items[0].category._ref === categoryId.iPad ||
        items[0].category._ref === categoryId.iPhone
          ? "bg-[#F5F5F7]"
          : "bg-[#fff]"
      } `}
    >
      <div className="relative h-44 w-44">
        <Image
          src={urlFor(items[0].image[0]).url()}
          alt="Product Image"
          fill
          className={`${
            items[0].category._ref === categoryId.iPad ||
            items[0].category._ref === categoryId.iPhone
              ? "object-cover"
              : "object-contain"
          }`}
        />
      </div>

      <div className="flex items-end flex-1 lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col text-xl gap-x-8 lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
            <p className="flex items-center font-semibold gap-x-1">
              {items.length}
              <ChevronDownIcon className="w-6 h-6 text-blue-500" />
            </p>
          </div>

          <p className="flex items-center text-blue-500 cursor-pointer hover:underline">
            Show product details <ChevronDownIcon className="w-6 h-6" />
          </p>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-xl font-semibold lg:text-2xl">
            <Currency
              quantity={items.reduce((total, item) => total + item.price, 0)}
            />
          </h4>
          <button
            onClick={removeItemFromBasket}
            className="text-blue-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
export default CheckoutProduct;
