import Image from "next/image";
import Button from "./Button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="sticky top-0 flex flex-col mx-auto h-screen max-w-[1350px] items-center justify-between px-8 pt-[140px] sm:pt-[68px]">
      <motion.div
        animate={{ y: 0, scale: 1 }}
        initial={{ y: -300, scale: 0 }}
        transition={{ duration: 2, type: "tween" }}
        className="z-50 flex flex-col items-center justify-center space-y-4 md:space-y-6"
      >
        <h1 className="flex flex-col items-center justify-center space-y-2 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
          <div className="font-semibold text-transparent bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500 bg-clip-text">
            iPhone 14
          </div>
          <div className="text-3xl font-medium">Big and bigger.</div>
        </h1>

        <div className="space-x-8">
          <Button title="Buy Now" />
          <a className="text-blue-500 link">Learn More</a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute bottom-0 inset-x-0 w-full h-[60vh] sm:h-[80vh] xl:h-[74vh] self-end transition duration-300"
      >
        <Image
          src="/iphone14_hero.jpg"
          alt="Hero Shot of iPhone 14"
          quality={100}
          fill
          className="object-cover object-top"
        />
      </motion.div>
    </section>
  );
};
export default Hero;
