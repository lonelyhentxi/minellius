import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'period_repo_event',
})
export class PeriodRepoEventEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'char',
    name: 'period',
    length: 7,
  })
  @Index('period_repo_event_period_index')
  period: string;

  @Column({
    type: 'int',
    name: 'event_type',
  })
  @Index('period_repo_event_event_type_index')
  eventType;

  @Column({
    type: 'varchar',
    name: 'reponame',
    length: 150,
  })
  @Index('period_repo_event_reponame_index')
  name: string;

  @Column({
    type: 'int',
    name: 'num',
  })
  @Index('period_repo_event_num_index')
  num: string;
}