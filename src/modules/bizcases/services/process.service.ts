import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { deepDiff } from 'lib/deepDiffCheck';
import _ from 'lodash';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { Process } from '../entities';
import { ProcessCreationInput, ProcessInput, ProcessArgs } from '../dto';
import { KpiLibService } from 'modules/kpi/services';

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
    const item = await this.processRepository.findOne(id);
    Object.assign(item, data);
    return this.processRepository.save(item);
  }

  async saveMany(data: ProcessInput[]) {
    const processes = await this.processRepository.findByIds(data.map(item => item.id));
    processes.map(pro => {
      Object.assign(pro, _.find(data, { id: pro.id }));
    });
    const result = await this.processRepository.save(data);
    return await this.processRepository.findByIds(result.map(item => item.id));
  }

  async remove(id: number) {
    await this.processRepository.delete(id);
    return { id };
  }
}
