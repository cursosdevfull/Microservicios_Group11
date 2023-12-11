import {
  ProductByPage,
  ProductFound,
  ProductFoundById,
  ProductSaved,
} from "../../infrastructure/product.infrastructure";
import { Product } from "../product";

export interface ProductRepository {
  save(product: Product): Promise<ProductSaved>;
  findById(id: string): Promise<ProductFoundById>;
  find(): Promise<ProductFound>;
  getByPage(page: number, pageSize: number): Promise<ProductByPage>;
}
