import React, { useState, createContext } from 'react';

export const CartContext = createContext();

export const ShoppingCartProvider = () => {
  const [cart, setCart] = useState([]);
  return <CartContext.Provider>{props.children}</CartContext.Provider>;
};
