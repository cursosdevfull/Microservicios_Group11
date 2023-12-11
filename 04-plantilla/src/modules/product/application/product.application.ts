import { Product, ProductProperties } from "../domain/product";
import { ProductRepository } from "../domain/repositories/product";

export class ProductApplication {
  constructor(private readonly repository: ProductRepository) {}

  async save(product: Product) {
    await this.repository.save(product);
  }

  async delete(id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }
    const product = result.value;
    product.delete();
    return await this.repository.save(product);
  }

  async update(fields: ProductProperties, id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }
    const product = result.value;
    product.update(fields);
    await this.repository.save(product);
  }

  async findById(id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }

    return result.value;
  }

  async find() {
    const result = await this.repository.find();
    if (result.isErr()) {
      return;
    }

    return result.value;
  }

  async getByPage(page: number, pageSize: number) {
    const result = await this.repository.getByPage(page, pageSize);
    if (result.isErr()) {
      return;
    }

    return result.value;
  }
}
