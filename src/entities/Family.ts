import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { IFamily } from "../interfaces/IFamily";
import { BaseEntity } from "./BaseEntity";
import { Order } from "./Order";
import { Genus } from "./Genus";

@Entity({ name: "families"})
export class Family extends BaseEntity implements IFamily {
  @PrimaryGeneratedColumn()
  family_id!: number;

  @Column()
  name!: string;

  @Column()
  order_id!: number;

  @ManyToOne(() => Order, order => order.families)
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @OneToMany(() => Genus, genus => genus.family)
  genera!: Genus[];
}