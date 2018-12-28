import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({
  name: 'current',
})
export class CurrentRecordEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id!: number;

  @Column({
    name: 'keyword',
    type: 'varchar',
    nullable: false,
  })
  @Index('current_keyword_uindex',{
    unique: true
  })
  keyword!: string;

  @Column({
    name: 'dict',
    type: 'text',
    nullable: false
  })
  value!: string;
}