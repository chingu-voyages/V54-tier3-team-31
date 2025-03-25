"use client"

import { StretchHorizontal, Star, Sprout, User} from "lucide-react";
import React from "react";
const NavigationMenu: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background flex justify-around items-center py-3 px-4">
      <div className="flex flex-col items-center">
          <StretchHorizontal />
      </div>
      <div className="flex flex-col items-center">
      <Star />
      </div>
      <div className="flex flex-col items-center">
      <Sprout />
      </div>
      <div className="flex flex-col items-center">
        <User />
      </div>
    </div>
  );
};

export default NavigationMenu;