import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { ResourceDetail } from '../entities';
import { ResourceDetailCreationInput, ResourceDetailInput, ResourceDetailsArgs } from '../dto';

@Injectable()
export class ResourceDetailService extends BaseService {
  constructor(@InjectRepository(ResourceDetail) private readonly resourceDetailRepository: Repository<ResourceDetail>) {
    super();
  }

  async findAll(args: ResourceDetailsArgs): Promise<ResourceDetail[]> {
    return await this.resourceDetailRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: ResourceDetailsArgs): Promise<[ResourceDetail[], number]> {
    return await this.resourceDetailRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<ResourceDetail> {
    return this.resourceDetailRepository.findOne(id);
  }

  async create(data: ResourceDetailCreationInput): Promise<ResourceDetail> {
    return await this.resourceDetailRepository.save(this.resourceDetailRepository.create(data));
  }

  async insertMany(data: ResourceDetailCreationInput[]): Promise<ResourceDetail[]> {
    const result = await this.resourceDetailRepository.save(data);
    return result;
  }

  async save(id: number, data: ResourceDetailInput): Promise<ResourceDetail> {
    return this.resourceDetailRepository.save({ ...data, id });
  }

  async saveMany(data: ResourceDetailInput[]) {
    const result = await this.resourceDetailRepository.save(data);
    return await this.resourceDetailRepository.findByIds(result.map(item => item.id));
  }

  async remove(id: number) {
    await this.resourceDetailRepository.delete(id);
    return { id };
  }
}
