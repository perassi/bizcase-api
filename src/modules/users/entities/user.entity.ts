import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { hash } from 'lib/passwordHasher';
import { Bizcase, BcTemplate } from 'modules/bizcases/entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password?: string;

  @Column({
    name: 'full_name',
    nullable: true,
  })
  fullName?: string;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @OneToMany(
    type => Bizcase,
    bizcase => bizcase.user,
    {
      cascade: true,
    }
  )
  bizcases?: Bizcase[];

  @OneToMany(
    type => BcTemplate,
    template => template.user,
    {
      cascade: true,
    }
  )
  bcTemplates?: BcTemplate[];

  @BeforeInsert()
  hashPassword?() {
    this.password = this.password && hash(this.password);
  }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
