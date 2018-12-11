import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserEventInfoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "date",
        name: "eventTime"
    })
    eventTime: Date;

    @Column({
        type: "int",
        name: "eventType"
    })
    eventType: number;

    @Column()
    userRank: string;

    @Column()
    repoRank: string;
}