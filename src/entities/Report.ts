import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Plant } from "./Plant";
import { User } from "./User";

@Entity({ name: "reports" })
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  report_id!: number;

  @Column()
  summary!: string;

  @Column()
  propose!: string;

  @Column()
  proof!: string;

  @Column()
  status!: number;

  @Column()
  plant_id!: number;

  @ManyToOne(() => Plant)
  @JoinColumn({ name: "plant_id" })
  plant!: Plant;

  @Column()
  plant_name!: string;

  @Column()
  plant_english_name!: string;

  @Column()
  plant_description!: string;

  @Column()
  plant_instructions!: string;

  @Column()
  plant_benefits!: string;

  @Column()
  plant_species_id!: number;

  @Column()
  user_id!: number;

}