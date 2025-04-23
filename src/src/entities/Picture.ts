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
  name!: string;

  @Column()
  url!: string;

  @Column()
  description!: string;

  @Column({ nullable: true })
  plant_id?: number;

  @Column({ nullable: true })
  disease_id?: number;

  @ManyToOne(() => Plant, plant => plant.images)
  @JoinColumn({ name: "plant_id" })
  plant!: Plant;

  @ManyToOne(() => Disease, disease => disease.images)
  @JoinColumn({ name: "disease_id" })
  disease!: Disease;
}