import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { TcoInput, TcoCreationInput } from '../dto';
import { Bizcase } from './bizcase.entity';

@Entity('tcos')
export class Tco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'bc_id',
  })
  bcId: number;

  @Column({
    name: 'opt_number',
    nullable: true,
    type: 'real',
  })
  optNumber?: number;

  @Column({
    name: 'parm_int_rate',
    nullable: true,
    type: 'real',
  })
  parmIntRate?: number;

  @Column({
    name: 'parm_tax_rate',
    nullable: true,
    type: 'real',
  })
  parmTaxRate?: number;

  @Column({
    name: 'parm_prepaid_asset_yrs',
    nullable: true,
    type: 'real',
  })
  parmPrepaidAssetYrs?: number;

  @Column({
    name: 'parm_fixed_asset_yrs',
    nullable: true,
    type: 'real',
  })
  parmFixedAssetYrs?: number;

  @Column({
    name: 'parm_ccy',
    type: 'text',
    nullable: true,
  })
  parmCcy?: string;

  @Column({
    name: 'parm_client_ccy',
    type: 'text',
    nullable: true,
  })
  parmClientCcy?: string;

  @Column({
    name: 'parm_ccy_rate',
    nullable: true,
    type: 'real',
  })
  parmCcyRate?: number;

  @ManyToOne(
    type => Bizcase,
    obj => obj.tcos,
  )
  @JoinColumn({ name: 'bc_id' })
  bc?: Bizcase;

  constructor(partial: Partial<Tco | TcoInput | TcoCreationInput>) {
    Object.assign(this, partial);
  }
}
