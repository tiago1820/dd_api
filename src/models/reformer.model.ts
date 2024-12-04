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

    // @Column({ nullable: true })
    // url?: String;

    @Column({ nullable: true })
    image?: String;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Location, (location) => location.reformersBornHere)
    @JoinColumn({ name: 'placeOfBirth' })
    placeOfBirth: Location;

    @ManyToOne(() => Location, (location) => location.reformersDiedHere)
    @JoinColumn({ name: 'placeOfDeath' })
    placeOfDeath: Location;

}