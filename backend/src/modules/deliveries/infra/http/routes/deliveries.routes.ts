import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import DeliveriesController from '../controller/DeliveriesController';

const deliveriesRouter = Router();

const deliveriesController = new DeliveriesController();

deliveriesRouter.get('/', deliveriesController.store);

deliveriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      weight: Joi.number().required(),
      address: Joi.object({
        street: Joi.string().required(),
        number: Joi.number(),
        neighborhood: Joi.string(),
        complement: Joi.string(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        geolocation: Joi.object({
          latitude: Joi.number().required(),
          longitude: Joi.number().required(),
        }),
      }),
    },
  }),
  deliveriesController.create,
);

deliveriesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  deliveriesController.delete,
);

deliveriesRouter.delete('/', deliveriesController.deleteall);

export default deliveriesRouter;
