import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Location } from "./location.model";

@Entity('reformers')
export class Reformer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    born: String;

    @Column()
    died: String;

    @Column()
    url: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Location, (location) => location.reformersBornHere)
    @JoinColumn({ name: 'placeOfBirth' })
    placeOfBirth: Location;

    @ManyToOne(() => Location, (location) => location.reformersDiedHere)
    @JoinColumn({ name: 'placeOfDeath' })
    placeOfDeath: Location;

}