import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { AdviceComment } from "./AdviceComment";

@Entity({ name: "evalue" })
export class Evalue extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "tinyint", width: 4 })
    rating!: number;

    @Column({ type: "text", nullable: true })
    content!: string | null;

    @Column()
    user_id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column()
    advice_id!: number;

    @Column({ type: "datetime" })
    created_at!: Date;

    @Column({ type: "datetime" })
    updated_at!: Date;

    @ManyToOne(() => AdviceComment)
    @JoinColumn({ name: "advice_id" })
    advice!: AdviceComment;
}    