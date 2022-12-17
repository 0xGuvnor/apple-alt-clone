import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { categoryId } from "../constants/productCategory";
import { addToBasket } from "../redux/basketSlice";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

interface Props {
  products: Product[];
}

const Products = ({ products }: Props) => {
  const dispatch = useDispatch();

  const addItemToBasket = (product: Product) => {
    dispatch(addToBasket(product));

    toast.success(`${product.title} has been added to your basket.`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <div
          key={product._id}
          className={`flex flex-col w-[320px] h-[320px] select-none rounded-xl duration-300 ease-in-out cursor-pointer transition-all p-4 lg:h-[350px] lg:w-[350px] lg:py-5 hover:scale-105 ${
            // background colour based on iPhone/iPad or others
            product.category._ref === categoryId.iPad ||
            product.category._ref === categoryId.iPhone
              ? "bg-[#F5F5F7]"
              : "bg-[#fff]"
          }`}
        >
          <div className="relative w-full h-64 lg:h-72">
            <Image
              src={urlFor(product.image[0]).url()}
              fill
              alt="Product Image"
              className={`${
                // object fit based on product type
                product.category._ref ===
                  "563f98c3-a00c-45b4-adc7-8b4ccc5adf0a" ||
                product.category._ref === "8f6d33c3-3c6f-44c1-aa98-13cc0f4a823d"
                  ? "object-cover"
                  : "object-contain"
              }`}
            />
          </div>

          <div className="flex items-center justify-between flex-1 space-x-3">
            <div className="text-lg lg:text-xl">
              <p className="font-semibold">{product.title}</p>
              <p className="font-light">
                <Currency quantity={product.price} />
              </p>
            </div>

            <div
              onClick={() => addItemToBasket(product)}
              className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full cursor-pointer bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500 lg:h-[55px] lg:w-[55px] hover:ring-1 hover:ring-pink-400"
            >
              <ShoppingBagIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Products;
