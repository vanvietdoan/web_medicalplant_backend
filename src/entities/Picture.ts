import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IPicture } from "../interfaces/IPicture";
import { Plant } from "./Plant";
import { Disease } from "./Disease";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "pictures"})
export class Picture extends BaseEntity implements IPicture {
  @PrimaryGeneratedColumn()
  picture_id!: number;

  @Column()
  url!: string;

  @Column()
  description!: string;

  @Column({ nullable: true })
  plant_id?: number;

  @Column({ nullable: true })
  disease_id?: number;

  // You need to make sure your Picture entity has a plant property like this:
  @ManyToOne(() => Plant, plant => plant.plant_id)
  @JoinColumn({ name: "plant_id" })
  plant!: Plant;

  @ManyToOne(() => Disease, disease => disease.disease_id)
  @JoinColumn({ name: "disease_id" })
  disease!: Disease;
}