import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const session = false;

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#e7ecee]/75 backdrop-blur-sm py-2 px-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative w-5 h-10 transition opacity-75 cursor-pointer hover:opacity-100">
            <Image
              src="https://rb.gy/vsvv2o"
              fill
              alt="Apple Logo"
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="items-center justify-center flex-1 hidden space-x-8 md:flex">
        <a className="headerLink">Products</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
      </div>

      <div className="flex items-center justify-center gap-x-4 md:w-1/5">
        <MagnifyingGlassIcon className="headerIcon" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            <div className="absolute text-[10px] text-white -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500">
              5
            </div>
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>
        {session ? (
          <Image
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            alt="Profile Image"
            width={24}
            height={24}
            className="rounded-full cursor-pointer"
          />
        ) : (
          <UserIcon className="headerIcon" />
        )}
      </div>
    </header>
  );
};
export default Header;
