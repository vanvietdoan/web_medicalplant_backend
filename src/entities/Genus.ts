import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { IGenus } from "../interfaces/IGenus";
import { Family } from "./Family";
import { Species } from "./Species";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "genuses"})
export class Genus extends BaseEntity implements IGenus {
  @PrimaryGeneratedColumn()
  genus_id!: number;

  @Column()
  name!: string;

  @Column()
  family_id!: number;

  @ManyToOne(() => Family, family => family.genera)
  @JoinColumn({ name: "family_id" })
  family!: Family;

  @OneToMany(() => Species, species => species.genus)
  species!: Species[];
}