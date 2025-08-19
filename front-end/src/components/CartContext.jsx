import React from "react";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = React.useState(() => {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  });
  // React.useEffect(() => {
  //   setCart([]); // state
  //   localStorage.removeItem("cart"); // localStorage
  // }, []);

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};