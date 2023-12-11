import { Router } from "express";

import { UserApplication } from "../../../application/user.application";
import { UserRepository } from "../../../domain/repositories/user";
import { UserInfrastructure } from "../../user.infrastructure";
import { UserController } from "./user.controller";

const repository: UserRepository = new UserInfrastructure();
const application = new UserApplication(repository);
const controller = new UserController(application);

class UserRoute {
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
     * /user/v1:
     *  get:
     *   tags:
     *    - User
     *   responses:
     *    200:
     *      description: Get all users
     *      content:
     *        application/json:
     *         schema:
     *          type: array
     *          items:
     *            $ref: '#/components/schemas/User'
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

export default new UserRoute().getRouter();

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *     type: object
 *     properties:
 *      id:
 *        type: string
 *        description: The auto-generated id of the user
 *        example: 5f8d0f7a-8f1f-4f5c-8a9b-9b5a0f9a9f09
 *      name:
 *        type: string
 *        description: User name
 *        example: User 1
 *      lastname:
 *        type: string
 *        description: User lastname
 *        example: User 1
 *      email:
 *        type: string
 *        description: User email
 *        example: user@email.com
 *      refreshToken:
 *        type: string
 *        description: Refresh token
 *        example: b9fc8a8f-c3cb-46df-bd99-de38fc17edfc
 *      password:
 *        type: string
 *        description: Password
 *        example: 12345
 *      createdAt:
 *        type: date
 *        description: User creation date
 *        example: 2021-01-01T00:00:00.000Z
 *      updatedAt:
 *        type: date
 *        description: User update date
 *        example: 2021-01-01T00:00:00.000Z
 *      deletedAt:
 *        type: date
 *        description: User deletion date
 *        example: 2021-01-01T00:00:00.000Z
 */
