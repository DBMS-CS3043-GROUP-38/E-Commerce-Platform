import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";

import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
//import Login from "./pages/Account/Login"; // Login page
//import Signup from "./pages/Account/Signup"; // Signup page
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Fashion from "./pages/Fashion/Fashion";
import HomeAppliances from "./pages/HomeAppliances/HomeAppliances";
import BeautyProducts from "./pages/BeautyProducts/BeautyProducts";
import Others from "./pages/Others/Others";
import Electronics from "./pages/Electronics/Electronics";
import Furniture from "./pages/Furniture/Furniture";




const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      

      {/* Protected Home route */}
      <Route path="/home" element={<Home />} />

      {/* Other routes */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/offer" element={<Offer />} />
      <Route path="/product/:_id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/paymentgateway" element={<Payment />} />
      <Route path="/fashion" element={<Fashion />} />
      <Route path="/home-appliances" element={<HomeAppliances />} />
      <Route path="/beauty-products" element={<BeautyProducts />} />
      <Route path="/others" element={<Others />} />
      <Route path="/electronics" element={<Electronics />} />
      <Route path="/furniture" element={<Furniture />} />
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
