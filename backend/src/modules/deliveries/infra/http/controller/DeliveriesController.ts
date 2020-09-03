import { Request, Response } from 'express';
import Delivery from '../../mongoose/schemas/Delivery';

export default class DeliveriesController {
  public async store(request: Request, response: Response) {
    await Delivery.find((error, data) => {
      if (data.length) {
        return response.json(data).status(200);
      }
      return response.json([]).status(200);
    });
  }

  public async create(request: Request, response: Response) {
    await Delivery.create(request.body).then(
      data => {
        return response.json(data).status(200);
      },
      error => {
        console.log(error);
        return response.status(400).json(error);
      },
    );
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    await Delivery.deleteOne({ _id: id }).exec((error, data) => {
      if (error) {
        return response.status(400).json(error);
      }
      return response.status(200).json(data);
    });
  }

  public async deleteall(request: Request, response: Response) {
    await Delivery.deleteMany({}).exec((error, data) => {
      if (error) {
        return response.status(400).json(error);
      }
      return response.status(200).json(data);
    });
  }
}
