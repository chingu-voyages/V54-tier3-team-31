"use client"

import React from "react";
import Link from "next/link";
import { StretchHorizontal, StretchHorizontalIcon, Star, StarIcon, LineChart, LineChartIcon, User, UserIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const DesktopNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex w-full border-b border-zinc-800 bg-navbar">
      <div className="w-full px-4 flex items-center h-14 relative">
        <Link href="/" className="hidden lg:flex items-center mr-14 absolute left-4 xl:left-20">
          <div className="text-white font-bold text-xl flex">
            <Image src="symbol.svg" alt="logo circle" width={20} height={20} className="mr-2" />
            <span className="text-white">Goal</span>Flow
          </div>
        </Link>
        
        <div className="flex items-center !max-w-3xl !w-full !mx-auto !gap-28 !h-12">
          <Link 
            href="/plans" 
            className="flex items-center text-lg font-medium text-white px-3 py-1.5 rounded-md"
          >
            {pathname === "/plans" ? (
              <StretchHorizontalIcon className="mr-2 h-6 w-6 text-white fill-white" />
            ) : (
              <StretchHorizontal className="mr-2 h-6 w-6" />
            )}
            Plans
          </Link>
          
          <Link 
            href="/focus" 
            className="flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            {pathname === "/focus" ? (
              <StarIcon className="mr-2 h-6 w-6 text-white fill-white" />
            ) : (
              <Star className="mr-2 h-6 w-6" />
            )}
            Today&apos;s Focus
          </Link>
          
          <Link 
            href="/progress" 
            className="flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            {pathname === "/progress" ? (
              <LineChartIcon className="mr-2 h-4 w-4 text-white fill-white" />
            ) : (
              <LineChart className="mr-2 h-4 w-4" />
            )}
            My Progress
          </Link>
        <Link 
          href="/account" 
          className="flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors ml-auto"
        >
          {pathname === "/account" ? (
            <UserIcon className="mr-2 h-4 w-4 text-white fill-white" />
          ) : (
            <User className="mr-2 h-4 w-4" />
          )}
          Account
        </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default DesktopNav;
