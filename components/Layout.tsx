import { FC, PropsWithChildren } from "react";
import { motion, Variants } from "framer-motion";
import Head from "next/head";

interface Props {
  title: string;
}

const variants: Variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -200 },
};

const Layout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ ease: "linear", duration: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
};
export default Layout;
