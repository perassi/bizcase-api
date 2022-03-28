import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { Bizcase } from '../entities';
import { BizcaseCreationInput, BizcaseInput, BizcasesArgs } from '../dto';

@Injectable()
export class BizcaseService extends BaseService {
  constructor(@InjectRepository(Bizcase) private readonly bizcaseRepository: Repository<Bizcase>) {
    super();
  }

  async findAll(args: BizcasesArgs): Promise<Bizcase[]> {
    return await this.bizcaseRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: BizcasesArgs): Promise<[Bizcase[], number]> {
    return await this.bizcaseRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<Bizcase> {
    return this.bizcaseRepository.findOne(id);
  }

  async create(data: BizcaseCreationInput, user: any): Promise<Bizcase> {
    return await this.bizcaseRepository.save(this.bizcaseRepository.create({ ...data, user }));
  }

  async save(id: number, data: BizcaseInput): Promise<Bizcase> {
    return this.bizcaseRepository.save({ ...data, id });
  }

  async saveMany(data: BizcaseInput[]) {
    await this.bizcaseRepository.save(data);
    return await this.bizcaseRepository.findByIds(data.map(kl => kl.id));
  }

  async remove(id: number) {
    await this.bizcaseRepository.delete(id);
    return { id };
  }
}
