import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { ProcLut } from '../entities';
import { ProcLutCreationInput, ProcLutInput, ProcLutsArgs } from '../dto';

@Injectable()
export class ProcLutService extends BaseService {
  constructor(
    @InjectRepository(ProcLut) private readonly procLutRepository: Repository<ProcLut>,
  ) {
    super();
  }

  async findAll(args: ProcLutsArgs): Promise<ProcLut[]> {
    return await this.procLutRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: ProcLutsArgs): Promise<[ProcLut[], number]> {
    return await this.procLutRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<ProcLut> {
    return this.procLutRepository.findOne(id);
  }

  async findOneByName(name: string): Promise<ProcLut> {
    return this.procLutRepository.findOne({ name });
  }

  async create(data: ProcLutCreationInput): Promise<ProcLut> {
    return await this.procLutRepository.save(this.procLutRepository.create(data));
  }

  async insertMany(data: ProcLutCreationInput[]): Promise<ProcLut[]> {
    const result = await this.procLutRepository.save(data);
    return await this.procLutRepository.findByIds(result.map(item => item.id));
  }

  async save(id: number, data: ProcLutInput): Promise<ProcLut> {
    return this.procLutRepository.save({ ...data, id });
  }

  async saveMany(data: ProcLutInput[]) {
    const result = await this.procLutRepository.save(data);
    return await this.procLutRepository.findByIds(result.map(item => item.id));
  }

  async remove(id: number) {
    await this.procLutRepository.delete(id);
    return { id };
  }
}
