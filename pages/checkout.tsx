import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectBasketItems, selectBasketTotal } from "../redux/basketSlice";
import Currency from "react-currency-formatter";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";
import { Stripe } from "stripe";
import { fetchPostJSON } from "../utils/apiHelpers";
import getStripe from "../utils/get-stripe";

interface GroupedItems {
  [key: string]: Product[];
}

const Checkout: NextPage = () => {
  const router = useRouter();

  const itemsInBasket = useSelector(selectBasketItems);
  const totalBasket = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] =
    useState<GroupedItems>({});
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout-session",
      { items: itemsInBasket }
    );

    // internal server error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // redirect to stripe checkout
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    console.warn(error.message);

    setLoading(false);
  };

  useEffect(() => {
    const groupedItems = itemsInBasket.reduce((results, item) => {
      if (!results[item._id]) results[item._id] = [];
      results[item._id].push(item);
      return results;
    }, {} as GroupedItems);

    setGroupedItemsInBasket(groupedItems);
  }, [itemsInBasket]);

  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        <title>Bag - Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-5xl pb-24 mx-auto mt-16">
        <div className="px-5">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {itemsInBasket.length ? "Review your bag." : "Your bag is empty."}
          </h1>
          <p className="my-4">Free delivery and returns.</p>
          {!itemsInBasket.length && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>
        {!!itemsInBasket.length && (
          <div className="mx-5 md:mx-8">
            <div className="drop-shadow-2xl">
              {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                <CheckoutProduct key={key} items={items} id={key} />
              ))}
            </div>

            <div className="max-w-5xl my-12 mt-6 ml-auto">
              <div className="divide-y divide-gray-300">
                <div className="pb-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={totalBasket} />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-x-1 lg:flex-row">
                      Estimated tax for:
                      <p className="flex items-center text-blue-500 cursor-pointer hover:underline">
                        Enter zip code
                        <ChevronDownIcon className="w-6 h-6" />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity={totalBasket} />
                  </h4>
                </div>
              </div>
              <div className="space-y-4 my-14">
                <h4 className="text-xl font-semibold">
                  How would you like to check out?
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex flex-col items-center flex-1 order-2 px-8 py-12 text-center bg-gray-200 rounded-xl">
                    <h4 className="flex flex-col mb-4 text-xl font-semibold">
                      <span>Pay Monthly</span>
                      <span>with Apple Card</span>
                      <span>$283.16/mo @ 0% APR</span>
                    </h4>
                    <Button
                      title="Check Out with Apple Card Monthly Installments"
                      width="w-full"
                    />
                    <p className="mt-2 max-w-[240px] text-[13px]">
                      $0.00 due today, which includes applicable full-price
                      items, down payments, shipping, and taxes.
                    </p>
                  </div>

                  <div className="flex flex-col items-center flex-1 px-8 py-12 space-y-8 bg-gray-200 rounded-xl md:order-2">
                    <h4 className="flex flex-col mb-4 text-xl font-semibold">
                      Pay in full
                      <span>
                        <Currency quantity={totalBasket} />
                      </span>
                    </h4>
                    <Button
                      noIcon
                      title="Check Out"
                      width="w-full"
                      height="md:h-[64px]"
                      loading={loading}
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default Checkout;
