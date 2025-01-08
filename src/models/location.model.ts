import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Reformer } from "./reformer.model";

@Entity('locations')
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Reformer, (reformer) => reformer.birthPlace)
    birthReformers: Reformer[];

    @OneToMany(() => Reformer, (reformer) => reformer.deathPlace)
    deathReformers: Reformer[];

    @CreateDateColumn()
    createdAt: Date;

}