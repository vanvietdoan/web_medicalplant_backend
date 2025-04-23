import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IReport } from "../interfaces/IReport";
import { User } from "./User";
import { Plant } from "./Plant";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "reports" })
export class Report extends BaseEntity implements IReport {
  @PrimaryGeneratedColumn()
  report_id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ default: "pending" })
  status!: string;

  @Column()
  user_id!: number;

  @Column()
  plant_id!: number;

  @ManyToOne(() => User, user => user.user_id)
  user!: User;

  @ManyToOne(() => Plant, plant => plant.plant_id)
  plant!: Plant;
}