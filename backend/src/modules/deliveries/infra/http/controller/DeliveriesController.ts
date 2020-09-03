import { Request, Response } from 'express';
import Delivery from '../../mongoose/schemas/Delivery';

export default class DeliveriesController {
  public async store(request: Request, response: Response): Promise<Response> {
    const data = await Delivery.find();
    return response.json(data);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = await Delivery.create(request.body);
    return response.json(data);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    await Delivery.deleteOne({ _id: id });

    return response.json({ msg: 'Delivery deleted' });
  }

  public async deleteall(
    request: Request,
    response: Response,
  ): Promise<Response> {
    await Delivery.deleteMany({});
    return response.json({ msg: 'Delivery deleted' });
  }
}
