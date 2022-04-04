import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { OtherCostOpt } from '../entities';
import { OtherCostOptCreationInput, OtherCostOptInput, OtherCostOptsArgs } from '../dto';

@Injectable()
export class OtherCostOptService extends BaseService {
  constructor(@InjectRepository(OtherCostOpt) private readonly otherCostOptRepository: Repository<OtherCostOpt>) {
    super();
  }

  async findAll(args: OtherCostOptsArgs): Promise<OtherCostOpt[]> {
    return await this.otherCostOptRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: OtherCostOptsArgs): Promise<[OtherCostOpt[], number]> {
    return await this.otherCostOptRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<OtherCostOpt> {
    return this.otherCostOptRepository.findOne(id);
  }

  async create(data: OtherCostOptCreationInput): Promise<OtherCostOpt> {
    return await this.otherCostOptRepository.save(this.otherCostOptRepository.create(data));
  }

  async insertMany(data: OtherCostOptCreationInput[]): Promise<OtherCostOpt[]> {
    const result = await this.otherCostOptRepository.save(data);
    return result;
  }

  async save(id: number, data: OtherCostOptInput): Promise<OtherCostOpt> {
    return this.otherCostOptRepository.save({ ...data, id });
  }

  async saveMany(data: OtherCostOptInput[]) {
    const result = await this.otherCostOptRepository.save(data);
    return await this.otherCostOptRepository.findByIds(result.map(item => item.id));
  }

  async remove(id: number) {
    await this.otherCostOptRepository.delete(id);
    return { id };
  }
}
