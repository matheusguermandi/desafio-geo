import { Router } from 'express';

import DeliveriesController from '../controller/DeliveriesController';

const deliveriesRouter = Router();

const deliveriesController = new DeliveriesController();

deliveriesRouter.get('/', deliveriesController.find);

deliveriesRouter.post('/', deliveriesController.create);

deliveriesRouter.delete('/:id', deliveriesController.delete);

export default deliveriesRouter;
