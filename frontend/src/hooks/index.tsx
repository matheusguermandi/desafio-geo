import React from 'react';

import { DeliveryProvider } from './delivery';
import { PositionProvider } from './position';

const AppProvider: React.FC = ({ children }) => (
  <DeliveryProvider>
    <PositionProvider>{children}</PositionProvider>
  </DeliveryProvider>
);

export default AppProvider;
