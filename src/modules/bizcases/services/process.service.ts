import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { Process } from '../entities';
import { ProcessCreationInput, ProcessInput, ProcessArgs } from '../dto';

@Injectable()
export class ProcessService extends BaseService {
  constructor(@InjectRepository(Process) private readonly processRepository: Repository<Process>) {
    super();
  }

  async findAll(args: ProcessArgs): Promise<Process[]> {
    return await this.processRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: ProcessArgs): Promise<[Process[], number]> {
    return await this.processRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<Process> {
    return this.processRepository.findOne(id);
  }

  async create(data: ProcessCreationInput): Promise<Process> {
    return await this.processRepository.save(this.processRepository.create(data));
  }

  async insertMany(data: ProcessCreationInput[]): Promise<Process[]> {
    const result = await this.processRepository.save(data);
    return result;
  }

  async save(id: number, data: ProcessInput): Promise<Process> {
    return this.processRepository.save({ ...data, id });
  }

  async saveMany(data: ProcessInput[]) {
    const result = await this.processRepository.save(data);
    return await this.processRepository.findByIds(result.map(item => item.id));
  }

  async remove(id: number) {
    await this.processRepository.delete(id);
    return { id };
  }
}
