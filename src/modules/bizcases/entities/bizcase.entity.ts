import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { User } from 'modules/users/entities';
import { BizcaseInput, BizcaseCreationInput } from '../dto';
import { BcTemplate } from './template.entity';

@Entity('bizcases')
export class Bizcase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  roi?: string;

  @Column({
    type: 'jsonb',
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
    nullable: true,
  })
  templateId?: number;

  @ManyToOne(
    type => User,
    user => user.bizcases
  )
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(
    type => BcTemplate,
    template => template.bizcases
  )
  @JoinColumn({ name: 'bc_template_id' })
  bcTemplate?: BcTemplate;

  constructor(partial: Partial<Bizcase | BizcaseInput | BizcaseCreationInput>) {
    Object.assign(this, partial);
  }
}
