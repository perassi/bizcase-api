import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { Tco } from '../entities';
import { TcoCreationInput, TcoInput, TcosArgs } from '../dto';

@Injectable()
export class TcoService extends BaseService {
  constructor(@InjectRepository(Tco) private readonly tcoRepository: Repository<Tco>) {
    super();
  }

  async findAll(args: TcosArgs): Promise<Tco[]> {
    return await this.tcoRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: TcosArgs): Promise<[Tco[], number]> {
    return await this.tcoRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<Tco> {
    return this.tcoRepository.findOne(id);
  }

  async create(data: TcoCreationInput): Promise<Tco> {
    return await this.tcoRepository.save(this.tcoRepository.create(data));
  }

  async insertMany(data: TcoCreationInput[]): Promise<Tco[]> {
    const result = await this.tcoRepository.save(data);
    return result;
  }

  async save(id: number, data: TcoInput): Promise<Tco> {
    return this.tcoRepository.save({ ...data, id });
  }

  async saveMany(data: TcoInput[]) {
    const result = await this.tcoRepository.save(data);
    return await this.tcoRepository.findByIds(result.map(item => item.id));
  }

  async remove(id: number) {
    await this.tcoRepository.delete(id);
    return { id };
  }
}
