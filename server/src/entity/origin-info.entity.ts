import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {string} from "joi";

@Entity()
export class OriginInfoEntity{
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
    userName: string;

    @Column()
    repoName: string;

    @Column({
        type: "date",
        name: "updateTime"
    })
    updateTime: Date;

    @Column()
    mark: boolean;

}