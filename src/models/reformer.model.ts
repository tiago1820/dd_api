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
import { Image } from "./image.model";

@Entity('reformers')
export class Reformer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    born: string;

    @Column()
    died: string;

    @Column()
    contribution?: string;

    @ManyToOne(() => Image, { nullable: true })
    @JoinColumn({ name: 'imageId' })
    image?: Image;

    @ManyToOne(() => Location, (location) => location.birthReformers, { nullable: true })
    @JoinColumn({ name: 'birthPlaceId' })
    birthPlace: Location | null;

    @ManyToOne(() => Location, (location) => location.deathReformers, { nullable: true })
    @JoinColumn({ name: 'deathPlaceId' })
    deathPlace: Location | null;

    @CreateDateColumn()
    createdAt: Date;

}