import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Journal = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Journals" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-white mb-2">
          <span className="text-black  font-semibold text-lg">Fluxora </span>{" "}
          stands at the forefront of the e-commerce and supply chain revolution, creating a unified platform that bridges the gap between online retail and logistics management. In an era where digital transformation and customer expectations are rapidly evolving, Fluxora is designed to offer seamless shopping experiences while optimizing the intricacies of supply chain operations. By integrating advanced technologies with user-centered design, Fluxora ensures businesses can meet consumer demands efficiently and sustainably. This dual approach not only supports retail growth but also encourages streamlined operations, fostering a balance of innovation and reliability in the digital marketplace.
        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-black  text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Journal;
