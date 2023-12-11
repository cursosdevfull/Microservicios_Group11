import { Router } from "express";

import { ProductApplication } from "../../../application/product.application";
import { ProductRepository } from "../../../domain/repositories/product";
import { ProductInfrastructure } from "../../product.infrastructure";
import { ProductController } from "./product.controller";

const repository: ProductRepository = new ProductInfrastructure();
const application = new ProductApplication(repository);
const controller = new ProductController(application);

class ProductRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post("/", controller.insert.bind(controller));
    this.router.get("/", controller.get.bind(controller));

    /**
     * @openapi
     * /product/v1:
     *  get:
     *   tags:
     *    - Product
     *   responses:
     *    200:
     *      description: Get all products
     *      content:
     *        application/json:
     *         schema:
     *          type: array
     *          items:
     *            $ref: '#/components/schemas/Product'
     *    500:
     *      description: Internal server error
     *      content:
     *        application/json:
     *          schema:
     *           $ref: '#/components/schemas/Error'
     */
    this.router.get("/page", controller.getByPage.bind(controller));
    this.router.get("/:id", controller.getById.bind(controller));
    this.router.put("/:id", controller.update.bind(controller));
    this.router.delete("/:id", controller.delete.bind(controller));
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new ProductRoute().getRouter();

/**
 * @openapi
 * components:
 *  schemas:
 *    Product:
 *     type: object
 *     properties:
 *      id:
 *        type: string
 *        description: The auto-generated id of the product
 *        example: 5f8d0f7a-8f1f-4f5c-8a9b-9b5a0f9a9f09
 *      name:
 *        type: string
 *        description: Product name
 *        example: Product 1
 *      price:
 *        type: integer
 *        description: Product price
 *        example: 50
 *      description:
 *        type: string
 *        description: Product description
 *        example: The best product
 *      image:
 *        type: string
 *        description: Product image
 *        example: https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
 *      createdAt:
 *        type: date
 *        description: Product creation date
 *        example: 2021-01-01T00:00:00.000Z
 *      updatedAt:
 *        type: date
 *        description: Product update date
 *        example: 2021-01-01T00:00:00.000Z
 *      deletedAt:
 *        type: date
 *        description: Product deletion date
 *        example: 2021-01-01T00:00:00.000Z
 */
