import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';

import { LicenseInput, LicenseCreationInput } from '../dto';
import { Tco } from './tco.entity';
import { LicenseDetail } from './license-detail.entity';

@Entity('licenses')
export class License {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'vendor',
    nullable: true,
  })
  vendor?: string;

  @Column({
    name: 'vendor_sol',
    nullable: true,
  })
  vendorSol?: string;

  @Column({
    name: 'opt',
    nullable: true,
  })
  opt?: string;

  @Column({
    name: 'discount_pct',
    nullable: true,
    type: 'real',
  })
  discountPct?: number;

  @Column({
    name: 'annu_incr_pct',
    nullable: true,
    type: 'real',
  })
  annuIncrPct?: number;

  @Column({
    name: 'tco_id',
  })
  tcoId: number;

  @ManyToOne(
    type => Tco,
    obj => obj.licenses,
  )
  @JoinColumn({ name: 'tco_id' })
  tco?: Tco;

  @OneToMany(
    type => LicenseDetail,
    obj => obj.license,
    {
      cascade: true,
    },
  )
  licenseDetails?: LicenseDetail[];

  constructor(partial: Partial<License | LicenseInput | LicenseCreationInput>) {
    Object.assign(this, partial);
  }
}
