import { Product, ProductProperties } from "../../domain/product";
import { ProductEntity } from "../entities/product.entity";

export class ProductDto {
  static fromDomainToData(product: Product): ProductEntity {
    const props = product.properties();
    const productEntity = new ProductEntity();
    productEntity.id = props.id;
    productEntity.name = props.name;
    productEntity.price = props.price;
    productEntity.description = props.description;
    productEntity.image = props.image;
    productEntity.createdAt = props.createdAt;
    productEntity.updatedAt = props.updatedAt;
    productEntity.deletedAt = props.deletedAt;
    return productEntity;
  }

  static fromDataToDomain(
    data: ProductEntity | ProductEntity[]
  ): Product | Product[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as Product[];
    }

    const props: ProductProperties = { ...data };
    return new Product(props);
  }
}
