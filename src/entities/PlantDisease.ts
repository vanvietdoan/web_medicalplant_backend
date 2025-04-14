import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IPlantDisease } from "../interfaces/IPlantDisease";
import { Plant } from "./Plant";
import { Disease } from "./Disease";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "plant_diseases" })
export class PlantDisease extends BaseEntity implements IPlantDisease {
  @PrimaryGeneratedColumn()
  plant_disease_id!: number;

  @Column()
  plant_id!: number;

  @Column()
  disease_id!: number;

  @Column()
  symptoms!: string;

  @Column()
  treatment!: string;

  @ManyToOne(() => Plant, plant => plant.plant_id)
  plant!: Plant;

  @ManyToOne(() => Disease, disease => disease.disease_id)
  disease!: Disease;
} 