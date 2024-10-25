import React from "react";
import Category from "./shopBy/Category";
import Price from "./shopBy/Price";

const ShopSideNav = () => {
  return (
    <div className="w-full bg-white">
      <div className="w-full flex flex-col gap-6">
        <button
          className="bg-gray-200 text-black font-bold py-2 px-4 rounded hover:bg-gray-300"
          onClick={() => console.log("Category clicked!")}
        >
          <Category icons={false} />
        </button>

        {/* Price button */}
        <button
          className="bg-gray-200 text-black font-bold py-2 px-4 rounded hover:bg-gray-300"
          onClick={() => console.log("Price clicked!")}
        >
          <Price />
        </button>
      </div>
    </div>
  );
};

export default ShopSideNav;
