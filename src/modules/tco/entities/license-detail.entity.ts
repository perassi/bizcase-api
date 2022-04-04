import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';

import { LicenseDetailInput, LicenseDetailCreationInput } from '../dto';
import { License } from './license.entity';

@Entity('license-details')
export class LicenseDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    nullable: true,
  })
  name: string;

  @Column({
    name: 'count',
    nullable: true,
    type: 'real',
  })
  count?: number;

  @Column({
    name: 'cost_type',
    nullable: true,
  })
  costType?: string;

  @Column({
    name: 'cost',
    nullable: true,
    type: 'real',
  })
  cost?: number;

  @Column({
    name: 'tot_cost',
    nullable: true,
    type: 'real',
  })
  totCost?: number;

  @Column({
    name: 'annu_spt_pect',
    nullable: true,
    type: 'real',
  })
  annuSptPect?: number;

  @Column({
    name: 'annu_spt_cost',
    nullable: true,
    type: 'real',
  })
  annuSptCost?: number;

  @Column({
    name: 'license_id',
  })
  licenseId: number;

  @ManyToOne(
    type => License,
    obj => obj.licenseDetails,
  )
  @JoinColumn({ name: 'license_id' })
  license?: License;

  constructor(partial: Partial<LicenseDetail | LicenseDetailInput | LicenseDetailCreationInput>) {
    Object.assign(this, partial);
  }
}
