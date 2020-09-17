import React from 'react';

import { DeliveryProvider } from './delivery';

const AppProvider: React.FC = ({ children }) => (
  <DeliveryProvider>{children}</DeliveryProvider>
);

export default AppProvider;
