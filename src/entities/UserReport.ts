import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IUserReport } from "../interfaces/IUserReport";
import { User } from "./User";
import { Report } from "./Report";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "user_reports" })
export class UserReport extends BaseEntity implements IUserReport {
  
  @PrimaryGeneratedColumn()
  user_report_id!: number;

  @Column({ name: "user_id" })
  user_id!: number;

  @Column({ name: "report_id" })
  report_id!: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Report, { eager: true })
  @JoinColumn({ name: "report_id" })
  report!: Report;
} 