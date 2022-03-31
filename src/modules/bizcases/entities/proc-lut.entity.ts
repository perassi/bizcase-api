import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { TplProcess } from './tpl-process.entity';

@Entity('proc_luts')
export class ProcLut {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  proc: string;

  @Column()
  comment: string;

  @OneToMany(
    type => TplProcess,
    tplProcess => tplProcess.bcTemplate,
    {
      cascade: true,
    },
  )
  tplProcesses?: TplProcess[];


  constructor(partial: Partial<ProcLut>) {
    Object.assign(this, partial);
  }
}
