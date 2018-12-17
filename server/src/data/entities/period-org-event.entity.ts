import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'period_org_event',
})
export class PeriodOrgEventEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'char',
    name: 'period',
    length: 7,
  })
  @Index('period_org_event_period_index')
  period: string;

  @Column({
    type: 'int',
    name: 'event_type',
  })
  @Index('period_org_event_event_type_index')
  eventType;

  @Column({
    type: 'varchar',
    name: 'orgname',
    length: 150,
  })
  @Index('period_org_event_orgname_index')
  name: string;

  @Column({
    type: 'int',
    name: 'num',
  })
  @Index('period_org_event_num_index')
  num: string;
}