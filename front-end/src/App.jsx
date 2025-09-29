import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/homepage/Home";
import Shop from "./pages/shoppage/Shop";
import ProductPage from "./pages/ProductPage/ProductPage";
import BasketPage from "./pages/basketPage/basketPage";
import Login from "./pages/authenticatePage/Login";
import Register from "./pages/authenticatePage/Register";

const App = () => {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Navbar />
            <div>
              <Routes>
                  <Route path="/product/:id" element={
                    <ProtectedRoute>
                      <ProductPage />
                    </ProtectedRoute>
                    } />
                  <Route path="/basket" element={
                    <ProtectedRoute>
                      <BasketPage />
                    </ProtectedRoute>
                    } />
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </CartProvider>
      </AuthProvider>
    </>
  );
};
export default App;