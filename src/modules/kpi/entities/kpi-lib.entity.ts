import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('kpi_libs')
export class KpiLib {
  @PrimaryGeneratedColumn()
  id: number;

  label?: string;

  description?: string;

  @Column({
    type: process.env.NODE_ENV === 'test' ? 'simple-json' : 'jsonb',
    nullable: true,
  })
  kpi?: {[key: string ]: any};

  @Column({
    name: 'tags',
    nullable: true,
    type: process.env.NODE_ENV === 'test' ? 'varying character' : 'character varying',
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
