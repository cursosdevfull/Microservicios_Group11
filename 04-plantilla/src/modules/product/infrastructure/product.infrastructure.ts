import { err, ok, Result } from "neverthrow";
import { IsNull } from "typeorm";

import { MysqlBootstrap } from "../../../bootstrap/mysql.bootstrap";
import { Product } from "../domain/product";
import { ProductRepository } from "../domain/repositories/product";
import { ProductDto } from "./dtos/product.dto";
import { ProductEntity } from "./entities/product.entity";

export type ProductFoundById = Result<Product | null, Error>;
export type ProductFound = Result<Product[] | null, Error>;
export type ProductByPage = Result<[Product[], number] | null, Error>;
export type ProductSaved = Result<void, Error>;

export class ProductInfrastructure implements ProductRepository {
  async save(product: Product): Promise<ProductSaved> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(ProductEntity);
      const productEntity = ProductDto.fromDomainToData(product);

      await repository.save(productEntity);
      return ok(undefined);
    } catch (error) {
      console.log(error);
      const errobj = new Error();
      errobj.message = (error as Error).message;
      return err(errobj);
    }
  }
  async findById(id: string): Promise<ProductFoundById> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(ProductEntity);
      const productEntity = await repository.findOne({
        where: { id, deletedAt: IsNull() },
      });
      if (!productEntity) {
        return ok(null);
      }

      return ok(ProductDto.fromDataToDomain(productEntity) as Product);
    } catch (error) {
      console.log(error);
      const errobj = new Error();
      errobj.message = (error as Error).message;
      return err(errobj);
    }
  }

  async find(): Promise<ProductFound> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(ProductEntity);
      const products = await repository.find({
        where: { deletedAt: IsNull() },
      });
      if (!products) {
        return ok(null);
      }

      return ok(ProductDto.fromDataToDomain(products) as Product[]);
    } catch (error) {
      console.log(error);
      const errobj = new Error();
      errobj.message = (error as Error).message;
      return err(errobj);
    }
  }

  async getByPage(page: number, pageSize: number): Promise<ProductByPage> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(ProductEntity);
      const [products, count] = await repository.findAndCount({
        where: { deletedAt: IsNull() },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      if (!products) {
        return ok(null);
      }

      const productsDomain = ProductDto.fromDataToDomain(products) as Product[];
      return ok([productsDomain, count]);
    } catch (error) {
      console.log(error);
      const errobj = new Error();
      errobj.message = (error as Error).message;
      return err(errobj);
    }
  }
}
