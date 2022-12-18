import Image from "next/image";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="sticky top-0 flex mx-auto h-screen max-w-[1350px] items-start justify-center px-8 pt-[140px] sm:pt-[68px]">
      <div className="z-50 flex flex-col items-center justify-center space-y-4 md:space-y-6">
        <h1 className="flex flex-col items-center justify-center space-y-2 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
          <div className="text-transparent bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500 bg-clip-text">
            iPhone 14
          </div>
          <div className="text-3xl font-medium">Big and bigger.</div>
        </h1>

        <div className="space-x-8">
          <Button title="Buy Now" />
          <a className="text-blue-500 link">Learn More</a>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-[60vh] sm:h-[80vh] lg:h-[78vh] xl:h-[72vh] self-end transition duration-300 overflow-hidden">
        <Image
          src="/iphone14_hero.jpg"
          alt="Hero Shot of iPhone 14"
          quality={100}
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};
export default Hero;
