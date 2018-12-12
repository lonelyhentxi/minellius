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

    @Column({
        type:"int",
        name:"commit"
    })
    commits: number;

    @Column({
        type:"int",
        name:"branches"
    })
    branches: number;

    @Column({
        type:"int",
        name:"releases"
    })
    releases: number;

    @Column({
        type:"int",
        name:"contributor"
    })
    contributor: number;

    @Column()
    tag: string;
}