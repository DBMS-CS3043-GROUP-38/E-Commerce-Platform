import React, { useState } from "react";
import { ImPlus } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import NavTitle from "./NavTitle";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Define the new categories here
  const items = [
    {
      _id: 1001,
      title: "Fashion",
      path: "/fashion", // Path to navigate to
      icons: true,
    },
    {
      _id: 1002,
      title: "Home Appliances",
      path: "/home-appliances", // Path to navigate to
    },
    {
      _id: 1003,
      title: "Beauty Products",
      path: "/beauty-products", // Path to navigate to
      icons: true,
    },
    {
      
      _id: 1006,
      title: "Furniture",
      path: "/furniture", // Path to navigate to
    },
    {
      _id: 1005,
      title: "Electronics",
      path: "/Electronics", // Path to navigate to
    },
    {
      _id: 1004,
      title: "Others",
      path: "/Others", // Path to navigate to
    },
  ];

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title, icons, path }) => (
            <li
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
            >
              {/* Make title clickable to navigate to the respective path */}
              <button
                onClick={() => navigate(path)} // Navigate to the respective path
                className="text-left w-full"
              >
                {title}
              </button>
              {icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
