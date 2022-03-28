import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';
import { UserCreationInput, UserInput, UsersArgs } from '../dto';
import { User } from '../entities';

@Injectable()
export class UserService extends BaseService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super();
  }

  async findAll(args: UsersArgs): Promise<User[]> {
    return this.userRepository.find(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(data: UserCreationInput): Promise<User> {
    return this.userRepository.save(this.userRepository.create(data));
  }

  async save(data: UserInput): Promise<User> {
    return this.userRepository.save(data);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
