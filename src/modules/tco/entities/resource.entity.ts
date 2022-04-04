import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';

import { ResourceInput, ResourceCreationInput } from '../dto';
import { Tco } from './tco.entity';
import { ResourceDetail } from './resource-detail.entity';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'opt',
  })
  opt: string;

  @Column({
    name: 'exp_pect_fees',
    nullable: true,
    type: 'real',
  })
  expPectFees?: number;

  @Column({
    name: 'proj_start_dt',
    nullable: true,
    type: 'time with time zone',
  })
  projStartDt?: Date;

  @Column({
    name: 'proj_end_dt',
    nullable: true,
    type: 'time with time zone',
  })
  projEndDt?: Date;

  @Column({
    name: 'res_type',
    nullable: true,
  })
  resType?: string;

  @Column({
    name: 'tco_id',
  })
  tcoId: number;

  @ManyToOne(
    type => Tco,
    obj => obj.resources,
  )
  @JoinColumn({ name: 'tco_id' })
  tco?: Tco;

  @OneToMany(
    type => ResourceDetail,
    obj => obj.resource,
    {
      cascade: true,
    },
  )
  resourceDetails?: ResourceDetail[];

  constructor(partial: Partial<Resource | ResourceInput | ResourceCreationInput>) {
    Object.assign(this, partial);
  }
}
