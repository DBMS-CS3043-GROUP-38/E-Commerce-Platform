
import { jwtDecode } from 'jwt-decode';// Correct import for jwt-decode

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { resetCart } from "../../redux/fluxoraSlice";
import ItemCard from "./ItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState(1); // Default route set to 1
  const totalVolume = products.length;

  // Fetch available routes from the backend (optional)
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Call backend to fetch available routes
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("/api/routes"); // Assuming you have a route to fetch routes
        setRoutes(response.data.routes); // Store fetched routes in state
      } catch (error) {
        console.error("Error fetching routes", error);
      }
    };

    fetchRoutes();
  }, []);

  const submitOrder = async (customerID, routeID, totalVolume, products) => {
    try {
      const orderDate = new Date().toISOString().split("T")[0];
      const response = await axios.post("/api/order", {
        customerID,
        value: products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        ),
        orderDate,
        routeID, // Now passing the selected route ID
        totalVolume,
        products: products.map((product) => ({
          ProductID: product._id,
          Amount: product.quantity,
        })),
      });
      console.log("Order Submitted:", response.data);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);
  }, [products]);

  const getCustomerID = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.CustomerID;
    }
    return null;
  };

  const handleOrderSubmit = async () => {
    const customerID = getCustomerID();
    if (customerID && products.length > 0) {
      await submitOrder(customerID, selectedRoute, totalVolume, products); // Passing the selected route
      dispatch(resetCart());
    } else {
      console.error("CustomerID not found or cart is empty");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <h2>Select Route:</h2>
      <select
        value={selectedRoute}
        onChange={(e) => setSelectedRoute(e.target.value)}
      >
        {routes.map((route) => (
          <option key={route.routeID} value={route.routeID}>
            {route.routeName} {/* Display the route name */}
          </option>
        ))}
      </select>

      {products.length > 0 ? (
        <div className="pb-20">
          {products.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}

          <button onClick={handleOrderSubmit}>Submit Order</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
