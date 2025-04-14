import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Genus } from "./Genus";
import { ISpecies } from "../interfaces/ISpecies";
import { BaseEntity } from "./BaseEntity";
import { Plant } from "./Plant";

@Entity({ name: "species"})
export class Species extends BaseEntity implements ISpecies {
  @PrimaryGeneratedColumn()
  species_id!: number;

  @Column()
  name!: string;

  @Column()
  genus_id!: number;

  @ManyToOne(() => Genus, genus => genus.species)
  @JoinColumn({ name: "genus_id" })
  genus!: Genus;
  
  @OneToMany(() => Plant, plant => plant.species)
  plants!: Plant[];
}