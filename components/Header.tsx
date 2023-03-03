import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../redux/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  const itemsInBasket = useSelector(selectBasketItems);

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#FAFAFA]/80 backdrop-blur-sm py-2 px-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/" scroll={false}>
          <div className="relative w-5 h-10 transition opacity-75 cursor-pointer hover:opacity-100">
            <Image
              src="/apple_logo.webp"
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
        <Link href="/checkout" scroll={false}>
          <div className="relative cursor-pointer">
            {!!itemsInBasket.length && (
              <div className="absolute text-[10px] text-white -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500">
                {itemsInBasket.length}
              </div>
            )}
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>
        {session ? (
          <Image
            src={
              session.user?.image ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt="Profile Image"
            width={24}
            height={24}
            onClick={() => signOut()}
            className="rounded-full cursor-pointer"
          />
        ) : (
          <UserIcon onClick={() => signIn()} className="headerIcon" />
        )}
      </div>
    </header>
  );
};
export default Header;
