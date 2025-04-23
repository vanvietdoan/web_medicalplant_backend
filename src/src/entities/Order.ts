import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { IOrder } from "../interfaces/IOrder";
import { BaseEntity } from "./BaseEntity";
import { Class } from "./Class";
import { Family } from "./Family";

@Entity({ name: "orders"})
export class Order extends BaseEntity implements IOrder {
  @PrimaryGeneratedColumn()
  order_id!: number;

  @Column()
  name!: string;

  @Column()
  class_id!: number;

  @ManyToOne(() => Class, cls => cls.orders)
  @JoinColumn({ name: "class_id" })
  class!: Class;

  @OneToMany(() => Family, family => family.order)
  families!: Family[];
}