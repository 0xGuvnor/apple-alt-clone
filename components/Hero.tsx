import Image from "next/image";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="sticky top-0 flex flex-col md:flex-row mx-auto h-screen max-w-[1350px] items-center md:justify-between px-8 mt-4 space-y-8 md:mt-0 md:space-y-0">
      <div className="space-y-4 md:space-y-8">
        <h1 className="space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
          <div className="text-transparent bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text">
            Powered
          </div>
          <div>By Intellect</div>
          <div>Driven By Values</div>
        </h1>

        <div className="space-x-8">
          <Button title="Buy Now" />
          <a className="link">Learn More</a>
        </div>
      </div>

      <div className="relative w-screen h-96 sm:h-[450px] sm:w-[450px] transition-all duration-500 lg:h-[650px] lg:w-[600px]">
        <Image
          src="/iphone.png"
          alt="Hero Shot of an Iphone"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
};
export default Hero;
