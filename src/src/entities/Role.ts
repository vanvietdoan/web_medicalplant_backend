import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IRole } from "../interfaces/IRole";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "roles" })
export class Role extends BaseEntity implements IRole {
  @PrimaryGeneratedColumn()
  role_id!: number;

  @Column()
  name!: string;
}