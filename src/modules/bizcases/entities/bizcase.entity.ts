import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, OneToMany } from 'typeorm';

import { User } from 'modules/users/entities';
import { BizcaseInput, BizcaseCreationInput } from '../dto';
import { BcTemplate } from './template.entity';
import { Tco } from 'modules/tco/entities';
import { Process } from './process.entity';

@Entity('bizcases')
@Unique(['title'])
export class Bizcase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: process.env.NODE_ENV === 'test' ? 'simple-json' : 'jsonb',
    nullable: true,
  })
  roi?: string;

  @Column({
    type: process.env.NODE_ENV === 'test' ? 'simple-json' : 'jsonb',
    nullable: true,
  })
  summary?: string;

  @Column({
    name: 'user_id',
    nullable: true,
  })
  userId?: number;

  @Column({
    name: 'bc_template_id',
    nullable: false,
  })
  templateId: number;

  @ManyToOne(
    type => User,
    user => user.bizcases,
  )
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(
    type => BcTemplate,
    template => template.bizcases,
  )
  @JoinColumn({ name: 'bc_template_id' })
  bcTemplate?: BcTemplate;

  @OneToMany(
    type => Tco,
    obj => obj.bc,
    {
      cascade: true,
    },
  )
  tcos?: Tco[];

  @OneToMany(
    type => Process,
    obj => obj.bc,
    {
      cascade: true,
    },
  )
  processes?: Process[];

  constructor(partial: Partial<Bizcase | BizcaseInput | BizcaseCreationInput>) {
    Object.assign(this, partial);
  }
}
