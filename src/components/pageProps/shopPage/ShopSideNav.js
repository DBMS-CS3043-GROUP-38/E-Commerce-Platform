import React from "react";
import Category from "./shopBy/Category";
//import Price from "./shopBy/Price";

const ShopSideNav = () => {
  return (
    <div className="w-full bg-white">
      <div className="w-full flex flex-col gap-6">
        <button
          className="bg-purple-500 text-white font-bold py-3 px-15 rounded hover:bg-blue-500"
          onClick={() => console.log("Category clicked!")}
        >
          <Category icons={false} />
        </button>

        {/* Price button */}
        
      </div>
    </div>
  );
};

export default ShopSideNav;
