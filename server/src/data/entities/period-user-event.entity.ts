import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'period_user_event',
})
export class PeriodUserEventEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'char',
    name: 'period',
    length: 7,
  })
  @Index('period_user_event_period_index')
  period: string;

  @Column({
    type: 'int',
    name: 'event_type',
  })
  @Index('period_user_event_event_type_index')
  eventType;

  @Column({
    type: 'varchar',
    name: 'username',
    length: 150,
  })
  @Index('period_user_event_username_index')
  name: string;

  @Column({
    type: 'int',
    name: 'num',
  })
  @Index('period_user_event_num_index')
  num: string;
}