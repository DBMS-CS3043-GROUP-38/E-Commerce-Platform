import React from "react";
import { useNavigate } from "react-router-dom";
import NavTitle from "./NavTitle";
import './stylebars.css'; // Import the main CSS file

const Category = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const items = [
    {
      _id: 1001,
      title: "Fashion",
      path: "/fashion",
      icons: true,
    },
    {
      _id: 1002,
      title: "Home Appliances",
      path: "/home-appliances",
    },
    {
      _id: 1003,
      title: "Beauty Products",
      path: "/beauty-products",
      icons: true,
    },
    {
      _id: 1006,
      title: "Furniture",
      path: "/furniture",
    },
    {
      _id: 1005,
      title: "Electronics",
      path: "/Electronics",
    },
    {
      _id: 1004,
      title: "Others",
      path: "/Others",
    },
  ];

  return (
    <div className="container">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="list">
          {items.map(({ _id, title, path }) => (
            <li key={_id} className="item">
              <button
                onClick={() => navigate(path)}
                className="button"
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
