import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { BcTemplate } from '../entities';
import { BcTemplateCreationInput, BcTemplateInput, BcTemplatesArgs } from '../dto';

@Injectable()
export class BcTemplateService extends BaseService {
  constructor(
    @InjectRepository(BcTemplate) private readonly bcTemplateRepository: Repository<BcTemplate>
  ) {
    super();
  }

  async findAll(args: BcTemplatesArgs): Promise<BcTemplate[]> {
    return await this.bcTemplateRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: BcTemplatesArgs): Promise<[BcTemplate[], number]> {
    return await this.bcTemplateRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<BcTemplate> {
    return this.bcTemplateRepository.findOne(id);
  }

  async create(data: BcTemplateCreationInput, user: any): Promise<BcTemplate> {
    return await this.bcTemplateRepository.save(
      this.bcTemplateRepository.create({ ...data, user })
    );
  }

  async save(id: number, data: BcTemplateInput): Promise<BcTemplate> {
    return this.bcTemplateRepository.save({ ...data, id });
  }

  async saveMany(data: BcTemplateInput[]) {
    await this.bcTemplateRepository.save(data);
    return await this.bcTemplateRepository.findByIds(data.map(kl => kl.id));
  }

  async remove(id: number) {
    await this.bcTemplateRepository.delete(id);
    return { id };
  }
}
