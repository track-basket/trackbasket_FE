import React from 'react';

const UserContext = React.createContext({
  //   user: { name: 'ed' },
  //   cart: [],
  //   location: {},
  //   addToCart: () => {},
  //   setUser: () => {},
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;
