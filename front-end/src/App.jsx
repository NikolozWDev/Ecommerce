import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import VerifyProtectedRoute from "./VerifyProtectedRoute";
import VerifyProtectedRouteSecond from "./VerifyProtectedRouteSecond";
import NotFound from "./components/NotFound";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/homepage/Home";
import Shop from "./pages/shoppage/Shop";
import ProductPage from "./pages/ProductPage/ProductPage";
import BasketPage from "./pages/basketPage/BasketPage";
import Login from "./pages/authenticatePage/Login";
import Register from "./pages/authenticatePage/Register";
import VerifyEmail from "./pages/authenticatePage/components/VerifyEmail";
import EnterEmail from "./pages/authenticatePage/components/EnterEmail";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import api from "./api";
import VerifyEmailSecond from "./pages/authenticatePage/components/VerifyEmailSecond";
import VerifiedResetRoute from "./pages/authenticatePage/components/VerifiedResetRoute";
import ChangePassword from "./pages/authenticatePage/components/ChangePassword";
import ScrollToTop from "./components/ScrollToTop";
import Disclaimer from "./components/Disclaimer";

const App = () => {

  const [allNum, setAllNum] = React.useState("")
  async function getItems() {
    try {
      const res = await api.get("api/basket/summary/")
      setAllNum(res.data.totalitems)
    } catch (error) {
      console.log(`occured error when getting items in navbar: ${error}`)
    }
  }
  // scrollIntoView
    const ecommerceCont = React.useRef(null)
    const homeArrival = React.useRef(null)
    const homeSelling = React.useRef(null)
    const homeBrowseStyle = React.useRef(null)

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Navbar allNum={allNum} getItems={getItems} scrollToSection={(section) => {
              if(section === "ecommerce" && ecommerceCont.current) ecommerceCont.current.scrollIntoView({ behavior: "smooth" })
              if(section === "arrival" && homeArrival.current) homeArrival.current.scrollIntoView({ behavior: "smooth" })
              if(section === "selling" && homeSelling.current) homeSelling.current.scrollIntoView({ behavior: "smooth" })
              if(section === "browseStyle" && homeBrowseStyle.current) homeBrowseStyle.current.scrollIntoView({ behavior: "smooth" })
            }} />
            <div className="relative">
              <Routes>
                <Route
                  path="/product/:id"
                  element={
                    <ProtectedRoute>
                      <ProductPage getItems={getItems} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/basket"
                  element={
                    <ProtectedRoute>
                      <BasketPage getItems={getItems} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/verify-email"
                  element={
                    <VerifyProtectedRoute>
                      <VerifyEmail />
                  </VerifyProtectedRoute>
                  }/>
                <Route
                  path="/verify-email-second"
                  element={
                    <VerifyProtectedRouteSecond>
                      <VerifyEmailSecond />
                  </VerifyProtectedRouteSecond>
                  }/>
                  <Route path="/change-password" element={
                    <VerifiedResetRoute>
                      <ChangePassword />
                    </VerifiedResetRoute>
                  } />
                  <Route path="/forgot-password" element={<EnterEmail />} />
                <Route path="/" element={<Home homeArrival={homeArrival} homeSelling={homeSelling} homeBrowseStyle={homeBrowseStyle} ecommerceCont={ecommerceCont} />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Disclaimer />
            </div>
            <Footer />
          </Router>
        </CartProvider>
      </AuthProvider>
    </>
  );
};
export default App;