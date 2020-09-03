import { Router } from 'express';

import DeliveriesRoute from '../../../../modules/deliveries/infra/http/routes/deliveries.routes';

const routes = Router();

routes.use('/v1/deliveries', DeliveriesRoute);

export default routes;
