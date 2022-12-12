import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-5 opacity-75 transition hover:opacity-100 cursor-pointer">
            <Image
              src="https://rb.gy/vsvv2o"
              fill
              alt="Apple Logo"
              className="object-contain"
            />
          </div>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a className="headerLink">Product</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
      </div>
    </header>
  );
};
export default Header;
