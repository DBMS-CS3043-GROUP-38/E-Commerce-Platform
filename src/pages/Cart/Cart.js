import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/fluxoraSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';// Correct import for jwt-decode

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products); // Ensure products is fetched properly
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const defaultRouteID = 1; // Default route ID
  const totalVolume = products.length; // Assuming volume is based on product count

  // Submit order to backend
  const submitOrder = async (customerID, routeID, totalVolume, products) => {
    try {
      const orderDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
      const response = await axios.post('/api/order', {
        customerID,
        value: products.reduce((total, product) => total + product.price * product.quantity, 0),
        orderDate,
        routeID,
        totalVolume,
        products: products.map(product => ({
          ProductID: product._id,
          Amount: product.quantity,
        })),
      });
      console.log('Order Submitted:', response.data);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  // Handle total amount calculation
  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);
  }, [products]);

  // Handle shipping charge based on total amount
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  // Function to get CustomerID from JWT
  const getCustomerID = () => {
    const token = localStorage.getItem('token'); // Replace 'token' with your actual token key
    if (token) {
      const decoded = jwtDecode(token); // Decode the token correctly
      return decoded.CustomerID; // Adjust according to your token structure
    }
    return null; // Return null if no token is found
  };

  const handleOrderSubmit = async () => {
    const customerID = getCustomerID(); // Get CustomerID from token
    if (customerID && products.length > 0) {
      await submitOrder(customerID, defaultRouteID, totalVolume, products);
      dispatch(resetCart()); // Clear the cart after order submission
    } else {
      // Handle the case when CustomerID is not available or cart is empty
      console.error('CustomerID not found or cart is empty');
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          <button
            onClick={handleOrderSubmit}
            className="py-2 px-10 bg-green-500 text-white font-semibold uppercase mb-4 hover:bg-green-700 duration-300"
          >
            Submit Order
          </button>

          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Coupon Number"
              />
              <p className="text-sm mdl:text-base font-semibold">
                Apply Coupon
              </p>
            </div>
            <p className="text-lg font-semibold">Update Cart</p>
          </div>
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${totalAmt + shippingCharge}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="Empty Cart"
            />
            <h1 className="text-xl font-semibold text-primeColor text-center">
              Your Cart is Empty
            </h1>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
