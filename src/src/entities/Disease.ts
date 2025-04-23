import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IDisease } from "../interfaces/IDisease";
import { PlantDisease } from "./PlantDisease";
import { Picture } from "./Picture";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "diseases"})
export class Disease extends BaseEntity implements IDisease {
  @PrimaryGeneratedColumn()
  disease_id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  symptoms!: string;

  @Column()
  instructions!: string;

  @OneToMany(() => PlantDisease, plantDisease => plantDisease.disease)
  plant_diseases!: PlantDisease[];

  @OneToMany(() => Picture, picture => picture.disease)
  images!: Picture[];
}