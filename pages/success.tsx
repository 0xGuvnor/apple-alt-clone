import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Button from "../components/Button";
import Currency from "react-currency-formatter";
import { GetServerSideProps } from "next";
import { fetchLineItems } from "../utils/fetchLineItems";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

interface Props {
  products: StripeProduct[];
}

const Success = ({ products }: Props) => {
  const router = useRouter();
  const { session_id } = router.query;
  const [isMounted, setIsMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const subtotal = products.reduce(
    (total, product) => total + product.price.unit_amount / 100,
    0
  );
  const { data: session } = useSession();

  // showOrderSummary always true for desktop, but only conditionally true for mobile
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1024 });
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Layout title="Thank you! - Apple">
      <header className="max-w-xl mx-auto">
        <Link href="/" scroll={false}>
          <div className="relative w-8 h-16 ml-4 cursor-pointer lg:hidden">
            <Image
              src="/apple_logo.webp"
              alt="Apple Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-9">
        <section className="order-2 max-w-xl pb-12 mx-auto lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
          <Link href="/" scroll={false}>
            <div className="relative hidden w-12 h-24 transition cursor-pointer ml-14 lg:inline-flex">
              <Image
                src="/apple_logo.webp"
                alt="Apple Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <div className="flex my-8 ml-4 space-x-4 lg:ml-14">
            <div className="flex items-center justify-center text-green-500 border-2 border-green-500 rounded-full h-11 w-11">
              <CheckIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className="text-lg">
                Thank you{" "}
                {session ? session.user?.name!.split(" ")[0] : "Guest"}
              </h4>
            </div>
          </div>

          <div className="p-4 mx-4 border border-gray-300 divide-y divide-gray-300 rounded-md lg:ml-14">
            <div className="pb-3 space-y-2">
              <p>Your order is confirmed.</p>
              <p className="text-sm text-gray-600">
                We've accepted your order, and we're getting it ready. Come back
                to this page for updates on your shipment status.
              </p>
            </div>
            <div className="pt-3 text-sm">
              <p className="font-medium text-gray-600">Tracking number:</p>
              <p className="cursor-pointer hover:underline">CTA98710FXR82</p>
            </div>
          </div>
          <div className="p-4 mx-4 my-4 space-y-2 border border-gray-300 rounded-md lg:ml-14">
            <p>Order updates</p>
            <p className="text-sm text-gray-600">
              You'll get shipping and delivery updates by email.
            </p>
          </div>
          <div className="flex flex-col items-center justify-between mx-4 text-sm lg:ml-14 lg:flex-row">
            <p className="hidden lg:inline">Need help? Contact us.</p>
            {isMounted && (
              <Button
                title="Continue Shopping"
                onClick={() => router.push("/")}
                padding="py-4"
                width={isTabletOrMobile ? "w-full" : undefined}
              />
            )}
          </div>
        </section>

        {isMounted && (
          <section className="overflow-y-scroll border-l border-gray-300 border-y bg-[#fafafa] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
              className={`w-full border-gray-300 text-sm lg:hidden ${
                showOrderSummaryCondition && "border-b"
              }`}
            >
              <div className="flex items-center justify-between max-w-xl px-4 py-6 mx-auto">
                <button
                  onClick={handleShowOrderSummary}
                  className="flex items-center space-x-2"
                >
                  <ShoppingBagIcon className="w-6 h-6" />
                  <p>Show order summary</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>
                <p className="text-xl font-medium text-black">
                  <Currency quantity={subtotal} />
                </p>
              </div>
            </div>
            {showOrderSummaryCondition && (
              <div className="max-w-xl p-4 mx-auto divide-y divide-gray-300 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16">
                <div className="pb-4 space-y-2">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 text-sm font-medium"
                    >
                      <div className="flex relative items-center justify-center w-16 h-16 border border-gray-300 bg-[#F1F1F1] text-xs text-white rounded-md">
                        <div className="relative rounded-md h-7 w-7">
                          <Image
                            src="/apple_logo.webp"
                            alt="Apple Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="absolute flex items-center justify-center w-5 h-5 bg-gray-400 rounded-full -right-2 -top-2">
                          {product.quantity}
                        </div>
                      </div>
                      <p className="flex-1">{product.description}</p>
                      <p>
                        <Currency quantity={product.price.unit_amount / 100} />
                      </p>
                    </div>
                  ))}
                </div>
                <div className="py-4 space-y-1">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Subtotal</p>
                    <p className="font-medium">
                      <Currency quantity={subtotal} />
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Discount</p>
                    <p className="text-gray-500">
                      <Currency quantity={0} />
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Shipping</p>
                    <p className="font-medium">
                      <Currency quantity={0} />
                    </p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <p>Total</p>
                  <p className="flex items-center text-xs text-gray-500 gap-x-2">
                    SGD
                    <span className="text-xl font-medium text-black">
                      <Currency quantity={subtotal} />
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </Layout>
  );
};
export default Success;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const sessionId = query.session_id as string;
  const products = await fetchLineItems(sessionId);

  return { props: { products } };
};
