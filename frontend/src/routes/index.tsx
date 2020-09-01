import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Initial from '../pages/Initial';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Initial} />
  </Switch>
);

export default Routes;
