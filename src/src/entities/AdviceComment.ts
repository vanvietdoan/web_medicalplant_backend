import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IAdviceComment } from "../interfaces/IAdviceComment";
import { User } from "./User";
import { Plant } from "./Plant";
import { Disease } from "./Disease";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "advice_comments"})
export class AdviceComment extends BaseEntity implements IAdviceComment {
  @PrimaryGeneratedColumn()
  advice_id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  user_id!: number;

  @Column()
  plant_id!: number;

  @Column()
  disease_id!: number;

  @ManyToOne(() => User, user => user.user_id)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Plant, plant => plant.plant_id)
  @JoinColumn({ name: "plant_id" })
  plant!: Plant;

  @ManyToOne(() => Disease, disease => disease.disease_id)
  @JoinColumn({ name: "disease_id" })
  disease!: Disease;
}