import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { IUserReport } from "../interfaces/IUserReport";
import { User } from "./User";
import { Report } from "./Report";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "user_reports"})
export class UserReport extends BaseEntity implements IUserReport {
  @PrimaryGeneratedColumn()
  user_report_id!: number;

  @Column()
  user_id!: number;

  @Column()
  report_id!: number;

  @ManyToOne(() => User, user => user.user_id)
  user!: User;

  @ManyToOne(() => Report, report => report.report_id)
  report!: Report;
} 