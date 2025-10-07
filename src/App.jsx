import { Routes, Route, BrowserRouter, Navigate, useLocation } from "react-router-dom";
import Home from '@/Components/Home';

import { useEffect } from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import ProductDetail from "./Components/ProductDetail";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsAndConditions from "./Components/TermsAndConditions";
import RefundAndReturnPolicy from "./Components/RefundAndReturnPolicy";
import Checkout from "./Components/Checkout";
import PaymentReturn from "./Components/PaymentReturn";
import ScrollToTop from "./Components/Common/ScrollToTop";
import MyAccount from "./Components/MyAccount";
import VehicleDetails from "./Components/VehicleDetails";
import Blogs from "./Components/Blogs";
import ContactUs from "./Components/ContactUs";
import AboutUs from "./Components/AboutUs";
import FAQs from "./Components/FAQs";
import HowToActive from "./Components/HowToActive";
import { ToastContainer } from "react-toastify";
import { ShopProvider } from "./Context/ShopProvider";
import CartDrawer from "./Components/CartDrawer";
import WishListDrawer from "./Components/WishListDrawer";
import Products from "./Components/Products";
import { useContext } from "react";
import { ShopContext } from "./Context/ShopContext";
// import useSessionCheck from "./utils/useSessionCheck";
// import { toast } from "react-toastify";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem("isLoggedIn");
  // const location = useLocation();
  // const { cart } = useContext(ShopContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If trying to access /checkout and cart is empty
  // if (location.pathname === "/checkout" && (!cart || cart.length === 0)) {
  //   toast.warn("Please add an item to your cart before checking out.");
  //   return <Navigate to="/" replace />;
  // }

  return element;
};

const PublicRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem("isLoggedIn");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element;
};

function AppRoutes() {
  // useSessionCheck();
  const { setHomeHeader } = useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    setHomeHeader(location.pathname === "/");
  }, [location.pathname, setHomeHeader]);

  return (
    <>
      <ScrollToTop />
      <WishListDrawer />
      <CartDrawer />
      <Login />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<PublicRoute element={<Login />} />} /> */}
        <Route path="/signup" element={<Register />} />
        <Route path="/:slug" element={<ProductDetail />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/vehicle-details" element={<VehicleDetails />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-and-return-policy" element={<RefundAndReturnPolicy />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faqs" element={<FAQs />} />

        <Route path="/how-to-active" element={<HowToActive />} />

        {/* For product listing */}
        <Route path="/products" element={<Products />} />

        {/* For product details */}
        <Route path="/products/:id" element={<Products />} />

        {/* Protected Routes */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />

        <Route path="/paymentreturn/:id" element={<ProtectedRoute element={<PaymentReturn />} />} />
        <Route path="/my-account" element={<ProtectedRoute element={<MyAccount />} />} />
        {/* <Route path="/cancel-order/:id" element={<ProtectedRoute><CancelOrder /></ProtectedRoute>} /> */}
      </Routes>

      <ToastContainer
        position="top-right"
        className="toaster"
        autoClose={1500}
        hideProgressBar={true}
        pauseOnHover={false}
        draggable={false}
      />
    </>
  )
}
function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ShopProvider>
  );
}


export default App
