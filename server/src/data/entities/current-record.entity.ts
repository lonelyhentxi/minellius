import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'current',
})
export class CurrentRecordEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    name: 'keyword',
  })
  keyword: string;

  @Column({
    name: 'dict',
  })
  value: string;
}