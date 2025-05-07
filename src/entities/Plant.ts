import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { IPlant } from "../interfaces/IPlant";
import { PlantDisease } from "./PlantDisease";
import { Picture } from "./Picture";
import { BaseEntity } from "./BaseEntity";
import { Species } from "./Species";
import { User } from "./User";

@Entity({ name: "plants" })
export class Plant extends BaseEntity implements IPlant {
  @PrimaryGeneratedColumn()
  plant_id!: number;

  @Column()
  name!: string;

  @Column()
  english_name!: string;

  @Column()
  description!: string;

  @Column()
  benefits!: string;

  @Column()
  instructions!: string;

  @Column()
  species_id!: number;

  @ManyToOne(() => Species, species => species.plants)
  @JoinColumn({ name: "species_id" })
  species!: Species;

  @OneToMany(() => PlantDisease, plantDisease => plantDisease.plant)
  plant_diseases!: PlantDisease[];

  @OneToMany(() => Picture, picture => picture.plant)
  images!: Picture[];
}