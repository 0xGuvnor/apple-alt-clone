import { Tab } from "@headlessui/react";
import type { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Basket from "../components/Basket";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Products from "../components/Products";
import { fetchCategories } from "../utils/fetchCategories";
import { fetchProducts } from "../utils/fetchProducts";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useVelocity,
} from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  categories: Category[];
  products: Product[];
  session: Session | null;
}

const Home: NextPage<Props> = ({ categories, products }) => {
  const [show, setShow] = useState(true);
  const { scrollY, scrollYProgress } = useScroll();
  const [velo, setVelo] = useState(0);
  const y = useMotionValue(0);
  const yVelo = useVelocity(y);

  useEffect(() => {
    console.log(1, scrollY);
    console.log(2, scrollYProgress);
  }, [scrollY, scrollYProgress]);

  const showProducts = (categoryId: number) => {
    const [category] = categories.filter(
      (category) => category.index === categoryId
    );
    return products.filter((product) => product.category._ref === category._id);
  };

  return (
    <div>
      <Head>
        <title>Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {/* <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ type: "spring", damping: 8, stiffness: 400 }}
            onClick={() => setShow(false)}
            className={`h-64 w-64 fixed right-0 z-50 bg-sky-500 inset-y-60 flex items-center justify-center`}
          >
            {velo}
          </motion.div>
        )}
      </AnimatePresence> */}

      <Basket />

      <main className="relative h-[200vh]">
        <Hero />
      </main>
      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1b1b1b]">
        <div className="py-16 space-y-10">
          <h1 className="text-4xl font-medium tracking-wide text-center text-white md:text-5xl">
            Latest Products
          </h1>

          <Tab.Group>
            <Tab.List className="flex justify-center text-white">
              {categories
                .sort(
                  (a, b) => a.index - b.index
                ) /* sorting the tabs based on ascending index */
                .map((category) => (
                  <Tab
                    key={category._id}
                    className={({ selected }) =>
                      `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                        selected
                          ? "borderGradient bg-[#35383C] text-white"
                          : "border-b-2 border-[#35383C] text-[#747474]"
                      }`
                    }
                  >
                    {/* <motion.div layoutId="underline"> */}
                    {category.title}
                    {/* </motion.div> */}
                  </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mx-auto max-w-fit">
              <Tab.Panel>
                <Products products={showProducts(1)} />
              </Tab.Panel>
              <Tab.Panel>
                <Products products={showProducts(2)} />
              </Tab.Panel>
              <Tab.Panel>
                <Products products={showProducts(3)} />
              </Tab.Panel>
              <Tab.Panel>
                <Products products={showProducts(4)} />
              </Tab.Panel>
              <Tab.Panel>
                <Products products={showProducts(5)} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const session = await getSession(ctx);

  return { props: { categories, products, session } };
};
