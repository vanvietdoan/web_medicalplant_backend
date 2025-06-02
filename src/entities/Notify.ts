import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { INotify } from "../interfaces/INotify";
import { User } from "./User";

@Entity({ name: "notify"})
export class Notify implements INotify {
  @PrimaryGeneratedColumn()
  notify_id!: number;

  @Column()
  user_id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  is_read!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => User, user => user.user_id)
  @JoinColumn({ name: "user_id" })  
  user!: User;
}