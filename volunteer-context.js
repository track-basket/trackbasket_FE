import React from 'react';

const VolunteerContext = React.createContext({});

export const VolunteerProvider = VolunteerContext.Provider;
export const VolunteerConsumer = VolunteerContext.Consumer;

export default VolunteerContext;
