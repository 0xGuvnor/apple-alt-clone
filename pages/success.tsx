import { CheckIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Button from "../components/Button";

const Success = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [isMounted, setIsMounted] = useState(false);

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Thank you! - Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="max-w-xl mx-auto">
        <Link href="/">
          <div className="relative w-8 h-16 ml-4 cursor-pointer lg:hidden">
            <Image
              src="https://rb.gy/vsvv2o"
              alt="Apple Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </header>

      <main>
        <section className="order-2 max-w-xl pb-12 mx-auto lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
          <Link href="/">
            <div className="relative hidden w-12 h-24 transition cursor-pointer ml-14 lg:inline-flex">
              <Image
                src="https://rb.gy/vsvv2o"
                alt="Apple Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <div className="flex my-8 ml-4 space-x-4 lg:ml-14 xl:ml-0">
            <div className="flex items-center justify-center border-2 border-black rounded-full h-11 w-11">
              <CheckIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className="text-lg">
                Thank you
                {/* {session ? session.user.name.split(' ')[0] : "Guest"} */}
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
          <div>
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
          <section>
            <div>
              <div>
                <button>
                  <ShoppingBagIcon className="w-6 h-6" />
                  <p>Show order summary</p>
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
export default Success;
