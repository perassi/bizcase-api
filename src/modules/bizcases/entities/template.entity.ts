import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { User } from 'modules/users/entities';
import { Bizcase } from './bizcase.entity';
import { TplProcess } from './tpl-process.entity';

@Entity('bc_templates')
export class BcTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    name: 'user_id',
    nullable: true,
  })
  userId?: number;

  @OneToMany(
    type => Bizcase,
    bizcase => bizcase.bcTemplate,
    {
      cascade: true,
    },
  )
  bizcases?: Bizcase[];

  @ManyToOne(
    type => User,
    user => user.bcTemplates,
  )
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToMany(
    type => TplProcess,
    tplProcess => tplProcess.bcTemplate,
    {
      cascade: true,
    },
  )
  tplProcesses?: TplProcess[];

  constructor(partial: Partial<BcTemplate>) {
    Object.assign(this, partial);
  }
}
