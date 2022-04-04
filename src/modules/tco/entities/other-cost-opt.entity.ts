import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';

import { OtherCostOptInput, OtherCostOptCreationInput } from '../dto';
import { Tco } from './tco.entity';

@Entity('other-cost-opts')
export class OtherCostOpt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'item',
    nullable: true,
  })
  item: string;

  @Column({
    name: 'cost_type',
    nullable: true,
  })
  costType?: string;

  @Column({
    name: 'yr1_cost',
    nullable: true,
    type: 'real',
  })
  yr1Cost?: number;

  @Column({
    name: 'yr2_cost',
    nullable: true,
    type: 'real',
  })
  yr2Cost?: number;

  @Column({
    name: 'yr3_cost',
    nullable: true,
    type: 'real',
  })
  yr3Cost?: number;

  @Column({
    name: 'yr4_cost',
    nullable: true,
    type: 'real',
  })
  yr4Cost?: number;

  @Column({
    name: 'yr5_cost',
    nullable: true,
    type: 'real',
  })
  yr5Cost?: number;

  @Column({
    name: 'tco_id',
  })
  tcoId: number;

  @ManyToOne(
    type => Tco,
    obj => obj.otherCostOpts,
  )
  @JoinColumn({ name: 'tco_id' })
  tco?: Tco;

  constructor(partial: Partial<OtherCostOpt | OtherCostOptInput | OtherCostOptCreationInput>) {
    Object.assign(this, partial);
  }
}
