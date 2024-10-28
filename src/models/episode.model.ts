import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('episodes')
export class Episode extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    air_date: String;

    @Column()
    episode_code: String;

    @Column()
    url: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}