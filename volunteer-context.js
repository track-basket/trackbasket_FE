import React from 'react';

const VolunteerContext = React.createContext({
  //   user: { name: 'ed' },
  //   cart: [],
  //   location: {},
  //   addToCart: () => {},
  //   setUser: () => {},
});

export const VolunteerProvider = VolunteerContext.Provider;
export const VolunteerConsumer = VolunteerContext.Consumer;

export default VolunteerContext;
