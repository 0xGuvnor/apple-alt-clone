const Hero = () => {
  return (
    <section className="sticky top-0 flex mx-auto h-screen max-w-[1350px] items-center justify-between px-8">
      <div className="space-y-8">
        <h1 className="space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
          <div className="text-transparent bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text">
            Powered
          </div>
          <div>By Intellect</div>
          <div>Driven By Values</div>
        </h1>

        <div>
          {/* <Button /> */}
          <a className="link">Learn More</a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
