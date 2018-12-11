import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class RepoInfoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    position: string;

    @Column()
    organization: string;
}