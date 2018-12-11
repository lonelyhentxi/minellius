import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class LangEventInfoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "date",
        name: "period"
    })
    period: Date;

    @Column({
        type: "int",
        name: "eventType"
    })
    eventType: number;

    @Column({
        type: 'text'
    })
    langRank: string;

}