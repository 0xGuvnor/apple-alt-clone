import { Tab } from "@headlessui/react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Products from "../components/Products";
import { fetchCategories } from "../utils/fetchCategories";
import { fetchProducts } from "../utils/fetchProducts";

interface Props {
  categories: Category[];
  products: Product[];
}

const Home: NextPage<Props> = ({ categories, products }) => {
  const showProducts = (categoryId: number) => {
    const [category] = categories.filter(
      (category) => category.index === categoryId
    );
    return products.filter((product) => product.category._ref === category._id);
  };

  return (
    <div className="">
      <Head>
        <title>Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative h-[200vh] bg-[#e7ecee]">
        <Hero />
      </main>
      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1b1b1b]">
        <div className="py-16 space-y-10">
          <h1 className="text-4xl font-medium tracking-wide text-center text-white md:text-5xl">
            New Promos
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
                    {category.title}
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
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await fetchCategories();
  const products = await fetchProducts();

  return { props: { categories, products } };
};
