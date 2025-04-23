import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { IClass } from "../interfaces/IClass";
import { BaseEntity } from "./BaseEntity";
import { Division } from "./Division";
import { Order } from "./Order";

@Entity({ name: "classes"})
export class Class extends BaseEntity implements IClass {
  @PrimaryGeneratedColumn()
  class_id!: number;

  @Column()
  name!: string;

  @Column()
  division_id!: number;

  @ManyToOne(() => Division, division => division.classes)
  @JoinColumn({ name: "division_id" })
  division!: Division;

  @OneToMany(() => Order, order => order.class)
  orders!: Order[];
}