import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IDivision } from "../interfaces/IDivision";
import { BaseEntity } from "./BaseEntity";
import { Class } from "./Class"; // You'll need to create this entity

@Entity({ name: "divisions"})
export class Division extends BaseEntity implements IDivision {
  @PrimaryGeneratedColumn()
  division_id!: number;

  @Column()
  name!: string;
  
  @OneToMany(() => Class, cls => cls.division)
  classes!: Class[];
}