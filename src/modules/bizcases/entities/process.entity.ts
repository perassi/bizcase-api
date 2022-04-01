import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { User } from 'modules/users/entities';
import { ProcessInput, ProcessCreationInput } from '../dto';
import { Bizcase } from './bizcase.entity';
import { ProcLut } from './proc-lut.entity';

@Entity('processes')
export class Process {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'bc_id',
  })
  bcId: number;

  @Column({
    name: 'proc_lut_id',
  })
  procLutId: number;

  @Column({
    name: 'kpi_id',
    nullable: true,
  })
  kpiId: number;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  data: object;

  @ManyToOne(
    type => Bizcase,
    obj => obj.processes,
  )
  @JoinColumn({ name: 'bc_id' })
  bc?: Bizcase;

  @ManyToOne(
    type => ProcLut,
    procLut => procLut.tplProcesses,
  )
  @JoinColumn({ name: 'proc_lut_id' })
  procLut?: ProcLut;

  constructor(partial: Partial<Process | ProcessInput | ProcessCreationInput>) {
    Object.assign(this, partial);
  }
}