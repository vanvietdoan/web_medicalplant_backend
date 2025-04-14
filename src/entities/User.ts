import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IUser } from "../interfaces/IUser";
import { Role } from "./Role";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "users" })
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  full_name!: string;

  @Column()
  title!: string;

  @Column()
  proof!: string;

  @Column()
  specialty!: string;

  @Column({ default: true })
  active!: boolean;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  role_id!: number;

  @ManyToOne(() => Role, role => role.role_id, { eager: true })
  @JoinColumn({ name: "role_id" })
  role!: Role;
}
