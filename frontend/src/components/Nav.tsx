"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import TranslateDropDown from "@/components/TranslateDropDown";

export default function Nav() {
  const pathname = usePathname(); // Get current route

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault(); // Prevent default navigation
      window.location.reload(); // Force refresh
    }
  };

  return (
    <nav className=" ">
      <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-3">
        <div>
          <Link
            href="/"
            onClick={handleLogoClick}
            className="text-lg font-bold flex gap-3"
          >
            <Image src={Logo} alt="logo" width={60} height={60} />
            <h2 className="text-[#DA08C9] md:text-[24px] text-[20px] mt-4">
              SaveFromInsta
            </h2>
          </Link>
        </div>

        <div className="ml-auto flex gap-4 justify-center md:w-auto w-full items-center mb-4 ">
          <Link href="/blogs" className="text-lg font-medium flex gap-3">
            <h2 className="text-[#000000] md:text-[24px] text-[20px] mt-4">
              Blogs
            </h2>
          </Link>
          <div className="mt-5">
            <TranslateDropDown />
          </div>
        </div>
      </div>
    </nav>
  );
}
