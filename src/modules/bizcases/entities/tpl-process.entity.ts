import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { User } from 'modules/users/entities';
import { TplProcessInput, TplProcessCreationInput } from '../dto';
import { BcTemplate } from './template.entity';
import { ProcLut } from './proc-lut.entity';

@Entity('tpl_processes')
export class TplProcess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'bc_template_id',
  })
  bcTemplateId: number;

  @Column({
    name: 'proc_lut_id',
  })
  procLutId: number;

  @Column({ type: 'jsonb', nullable: true })
  kpis: object;

  @ManyToOne(
    type => BcTemplate,
    template => template.tplProcesses,
  )
  @JoinColumn({ name: 'bc_template_id' })
  bcTemplate?: User;

  @ManyToOne(
    type => ProcLut,
    procLut => procLut.tplProcesses,
  )
  @JoinColumn({ name: 'proc_lut_id' })
  procLut?: ProcLut;

  constructor(partial: Partial<TplProcess | TplProcessInput | TplProcessCreationInput>) {
    Object.assign(this, partial);
  }
}
