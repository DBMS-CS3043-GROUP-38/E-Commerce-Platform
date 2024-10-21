import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Price from "./shopBy/Price";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
     
      <button
        className="bg-transparent text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black"
        onClick={() => console.log("Category clicked!")}
      >
        <Category icons={false} />
      </button>

      {/* Brand button */}
      <button
        className="bg-white text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black"
        onClick={() => console.log("Brand clicked!")}
      >
        <Brand />
      </button>

      {/* Price button */}
      <button
        className="bg-transparent text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black"
        onClick={() => console.log("Price clicked!")}
      >
        <Price />
      </button>
    </div>
  );
};

export default ShopSideNav;
