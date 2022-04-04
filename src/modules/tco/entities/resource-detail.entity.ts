import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { ResourceDetailInput, ResourceDetailCreationInput } from '../dto';
import { Resource } from './resource.entity';

@Entity('resource_details')
export class ResourceDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'resource_id',
  })
  resourceId: number;

  @Column({
    name: 'name',
    nullable: true,
  })
  name?: string;

  @Column({
    name: 'cost_rate',
    nullable: true,
    type: 'real',
  })
  costRate?: number;

  @Column({
    name: 'est_hrs',
    nullable: true,
    type: 'real',
  })
  estHrs?: number;

  @Column({
    name: 'tot',
    nullable: true,
    type: 'real',
  })
  tot?: number;

  @Column({
    name: 'yr1_hrs',
    nullable: true,
    type: 'real',
  })
  yr1Hrs?: number;

  @Column({
    name: 'yr2_hrs',
    nullable: true,
    type: 'real',
  })
  yr2Hrs?: number;

  @Column({
    name: 'yr3_hrs',
    nullable: true,
    type: 'real',
  })
  yr3Hrs?: number;

  @ManyToOne(
    type => Resource,
    obj => obj.resourceDetails,
  )
  @JoinColumn({ name: 'resource_id' })
  resource?: Resource;

  constructor(partial: Partial<ResourceDetail | ResourceDetailInput | ResourceDetailCreationInput>) {
    Object.assign(this, partial);
  }
}
