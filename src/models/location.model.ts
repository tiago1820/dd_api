import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Reformer } from "./reformer.model";

@Entity('locations')
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    // @Column({ nullable: true })
    // bornHere?: String;

    // @Column({ nullable: true })
    // diedHere?: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Reformer, (reformer) => reformer.placeOfBirth)
    reformersBornHere: Reformer[];

    @OneToMany(() => Reformer, (reformer) => reformer.placeOfDeath)
    reformersDiedHere: Reformer[];

}