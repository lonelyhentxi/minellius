import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CodeLine} from "tslint/lib/verify/lines";

@Entity()
export class UserInfoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "int",
        name: "watch"
    })
    watch: number;

    @Column({
        type: "int",
        name: "star"
    })
    star: number;

    @Column({
        type: "int",
        name: "fork"
    })
    fork: number;

    @Column()
    lang: string;

    @Column()
    commits: string;

    @Column()
    branches: string;

    @Column()
    releases: string;

    @Column()
    contributor: string;

    @Column()
    tag: string;
}