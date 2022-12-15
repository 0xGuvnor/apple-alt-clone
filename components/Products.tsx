import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { urlFor } from "../sanity";
import Button from "./Button";

interface Props {
  products: Product[];
}

const Products = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <div
          key={product._id}
          className={`flex flex-col w-[320px] h-[320px] select-none rounded-xl py-8 px-4 md:h-[400px] md:w-[400px] md:py-5 ${
            // background colour based on iPhone/iPad or others
            product.category._ref === "563f98c3-a00c-45b4-adc7-8b4ccc5adf0a" ||
            product.category._ref === "8f6d33c3-3c6f-44c1-aa98-13cc0f4a823d"
              ? "bg-[#F5F5F7]"
              : "bg-[#fff]"
          }`}
        >
          <div className="relative w-full h-64 md:h-72">
            <Image
              src={urlFor(product.image[0]).url()}
              fill
              alt="Product Image"
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-between flex-1 space-x-3">
            <div className="text-lg md:text-xl">
              <p className="font-semibold">{product.title}</p>
              <p className="font-light">
                $
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {/* regex to add thousands separator */}
              </p>
            </div>

            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full cursor-pointer bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500 md:h-[70px] md:w-[70px]">
              <ShoppingBagIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Products;
