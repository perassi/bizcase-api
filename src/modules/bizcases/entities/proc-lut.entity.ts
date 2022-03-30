import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('proc_lut')
export class ProcLut {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  proc: string;

  @Column()
  comment: string;

  constructor(partial: Partial<ProcLut>) {
    Object.assign(this, partial);
  }
}
