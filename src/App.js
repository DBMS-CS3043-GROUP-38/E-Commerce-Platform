import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  Navigate,
} from "react-router-dom";

// Import components
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";

// Import pages
import About from "./pages/About/About";
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

// Import for authentication
import Login from "./pages/Login";  // Make sure you have a Login page component
import Signup from "./pages/Signup";  // Make sure you have a Signup page component

// Import Protected Route
import ProtectedRoute from "./components/ProtectedRoutes"; // Component for JWT protection

// Layout component for common structure (Header, Footer, etc.)
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

// Define your routes with protected paths
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {/* Public routes (Login and Signup) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>  {/* Protecting all routes inside this block */}
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
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

      {/* Redirect to Home page if no other routes match */}
      <Route path="*" element={<Navigate to="/home" replace />} />
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
