import { Request, Response } from 'express';
import Delivery from '../../mongoose/schemas/Delivery';

export default class DeliveriesController {
  public async find(response: Response): Promise<Response> {
    const data = await Delivery.find();
    return response.json(data);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = await Delivery.create(request.body);
    return response.json(data);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    await Delivery.findOneAndRemove({ id });

    return response.json({ msg: 'Delivery deleted' });
  }
}
