import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { ProductApplication } from '../../../application/product.application';
import { Product, ProductProperties } from '../../../domain/product';

export class ProductController {
  constructor(private readonly application: ProductApplication) {}

  async insert(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const id = uuidv4();

    const productProperties: ProductProperties = body;
    const product = new Product({ ...productProperties, id });

    await this.application.save(product);

    res.status(201).send();
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const product = await this.application.findById(id);

    res.status(200).json(product);
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const products = await this.application.find();

    res.status(200).json(products);
  }

  async getByPage(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string);

    const result = await this.application.getByPage(page, pageSize);
    if (!result) {
      res.status(204).send();
      return;
    }
    const [products, count] = result;

    res.status(200).json({ data: products, count, page, pageSize });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const body = req.body;

    const productProperties: ProductProperties = body;

    await this.application.update(productProperties, id);

    res.status(204).send();
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    await this.application.delete(id);

    res.status(204).send();
  }
}
