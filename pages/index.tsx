import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Products from "../components/Products";

const Home: NextPage = () => {
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
      <section className="text-4xl font-medium tracking-wide text-center text-white md:text-5xl">
        New Promos
      </section>
    </div>
  );
};

export default Home;
