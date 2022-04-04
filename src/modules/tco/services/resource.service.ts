import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { Resource } from '../entities';
import { ResourceCreationInput, ResourceInput, ResourcesArgs } from '../dto';

@Injectable()
export class ResourceService extends BaseService {
  constructor(@InjectRepository(Resource) private readonly resourceRepository: Repository<Resource>) {
    super();
  }

  async findAll(args: ResourcesArgs): Promise<Resource[]> {
    return await this.resourceRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: ResourcesArgs): Promise<[Resource[], number]> {
    return await this.resourceRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<Resource> {
    return this.resourceRepository.findOne(id);
  }

  async create(data: ResourceCreationInput): Promise<Resource> {
    return await this.resourceRepository.save(this.resourceRepository.create(data));
  }

  async insertMany(data: ResourceCreationInput[]): Promise<Resource[]> {
    const result = await this.resourceRepository.save(data);
    return result;
  }

  async save(id: number, data: ResourceInput): Promise<Resource> {
    return this.resourceRepository.save({ ...data, id });
  }

  async saveMany(data: ResourceInput[]) {
    const result = await this.resourceRepository.save(data);
    return await this.resourceRepository.findByIds(result.map(item => item.id));
  }

  async remove(id: number) {
    await this.resourceRepository.delete(id);
    return { id };
  }
}
