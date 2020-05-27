import React from 'react';

const ShoppingCart = React.createContext([]);

export const UserProvider = ShoppingCart.Provider;
export const UserConsumer = ShoppingCart.Consumer;

export default ShoppingCart;
