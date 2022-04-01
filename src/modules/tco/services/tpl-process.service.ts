import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { TplProcess } from '../entities';
import { TplProcessCreationInput, TplProcessInput, TplProcessArgs } from '../dto';

@Injectable()
export class TplProcessService extends BaseService {
  constructor(@InjectRepository(TplProcess) private readonly tplProcessRepository: Repository<TplProcess>) {
    super();
  }

  async findAll(args: TplProcessArgs): Promise<TplProcess[]> {
    return await this.tplProcessRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: TplProcessArgs): Promise<[TplProcess[], number]> {
    return await this.tplProcessRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<TplProcess> {
    return this.tplProcessRepository.findOne(id);
  }

  async create(data: TplProcessCreationInput): Promise<TplProcess> {
    return await this.tplProcessRepository.save(this.tplProcessRepository.create(data));
  }

  async insertMany(data: TplProcessCreationInput[]): Promise<TplProcess[]> {
    const result = await this.tplProcessRepository.save(data);
    return result;
  }

  async save(id: number, data: TplProcessInput): Promise<TplProcess> {
    return this.tplProcessRepository.save({ ...data, id });
  }

  async saveMany(data: TplProcessInput[]) {
    const result = await this.tplProcessRepository.save(data);
    return await this.tplProcessRepository.findByIds(result.map(item => item.id));
  }

  async remove(id: number) {
    await this.tplProcessRepository.delete(id);
    return { id };
  }
}
