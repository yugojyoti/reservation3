import React from "react";
import { Location } from "@prisma/client";
interface HeaderProps {
  name: string;
  location: Location;
}
const RestaurantHeader: React.FC<HeaderProps> = ({ name, location }) => {
  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r  from-[#01161e] to-[#69969d] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white captitalize text-shadow text-center">
          {name} <span className="capitalize">({location?.name})</span>
        </h1>
      </div>
    </div>
  );
};

export default RestaurantHeader;
