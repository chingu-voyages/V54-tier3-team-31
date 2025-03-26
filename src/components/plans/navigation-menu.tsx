"use client"

import { StretchHorizontal, StretchHorizontalIcon, Star, StarIcon, Sprout, SproutIcon, User, UserIcon } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";

const NavigationMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-navbar flex justify-around items-center py-3 px-4">
      <div className="flex flex-col items-center hover:cursor-pointer">
        {pathname === "/plans" ? (
          <StretchHorizontalIcon className="text-white fill-white" />
        ) : (
          <StretchHorizontal className="text-zinc-400" />
        )}
      </div>
      <div className="flex flex-col items-center hover:cursor-pointer">
        {pathname === "/focus" ? (
          <StarIcon className="text-white fill-white" />
        ) : (
          <Star className="text-zinc-400" />
        )}
      </div>
      <div className="flex flex-col items-center hover:cursor-pointer">
        {pathname === "/progress" ? (
          <SproutIcon className="text-white fill-white" />
        ) : (
          <Sprout className="text-zinc-400" />
        )}
      </div>
      <div className="flex flex-col items-center hover:cursor-pointer">
        {pathname === "/profile" ? (
          <UserIcon className="text-white fill-white" />
        ) : (
          <User className="text-zinc-400" />
        )}
      </div>
    </div>
  );
};

export default NavigationMenu;