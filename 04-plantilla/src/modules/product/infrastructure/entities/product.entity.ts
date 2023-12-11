import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "product" })
export class ProductEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "int" })
  price: number;

  @Column({ type: "varchar", length: 500 })
  description: string;

  @Column({ type: "varchar", length: 100 })
  image: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;
}
