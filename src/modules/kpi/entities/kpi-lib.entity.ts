import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Kpi } from '../dto';

@Entity('kpi_libs')
export class KpiLib {
  @PrimaryGeneratedColumn()
  id: number;

  label?: string;

  description?: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  kpi?: Kpi;

  @Column({
    name: 'tags',
    nullable: true,
    type: 'character varying',
  })
  tags?: string[];

  @Column({
    nullable: true,
  })
  source?: string;

  @Column({
    name: 'is_active',
    nullable: true,
  })
  isActive?: boolean;

  benefitType?: string;

  constructor(partial: Partial<KpiLib>) {
    Object.assign(this, partial);
  }
}
